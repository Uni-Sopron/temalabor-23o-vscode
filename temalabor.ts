import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request-promise-native'; // Make sure to install the 'request-promise-native' package

const budapestTimezone: number = 1; // Adjust according to your timezone
const repoAdatokFile: string = 'repo_adatok.json';

function readRepoAdatok(): any | null {
    const filePath = path.join(__dirname, repoAdatokFile);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const repoAdatok = JSON.parse(fileContent);
        return repoAdatok;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${repoAdatokFile} file not found.`);
        } else {
            console.error(`Error reading ${repoAdatokFile} file: ${error.message}`);
        }
        return null;
    }
}

async function getCommitDetails(apiUrl: string, githubToken: string, owner: string, repo: string, sha: string): Promise<any> {
    const commitUrl = `${apiUrl}/repos/${owner}/${repo}/commits/${sha}`;
    const headers = {
        'Authorization': `token ${githubToken}`,
        'User-Agent': 'GitHubExtentionProject' // Replace with an appropriate User-Agent
    };

    try {
        const response = await request.get(commitUrl, { headers, json: true });
        return response;
    } catch (error) {
        console.error(`Error fetching commit details: ${error.message}`);
        return null;
    }
}

function convertUtcToBudapest(utcTimestamp: string): string {
    const utcTime = new Date(utcTimestamp);
    const budapestTime = new Date(utcTime.getTime() + budapestTimezone * 60 * 60 * 1000);
    return budapestTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export async function jsonGenerator() {
    const repoAdatok = readRepoAdatok();

    if (!repoAdatok) {
        return;
    }

    const repoOwner = repoAdatok.repo_owner;
    const repoName = repoAdatok.repo_name;
    const githubToken = repoAdatok.github_token;

    if (!repoOwner || !repoName || !githubToken) {
        console.log('Missing data in repo_adatok.json file.');
        return;
    }

    const apiUrl: string = 'https://api.github.com';

    while (true) {
        try {
            const commits = await request.get(`${apiUrl}/repos/${repoOwner}/${repoName}/commits`, {
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'User-Agent': 'GitHubExtentionProject'
                },
                json: true
            });

            if (commits.length > 0) {
                const simplifiedCommits = [];
                const contributorCommits = {};

                for (const commit of commits) {
                    const contributorName = commit.commit.author.name; // Fix this line
                    const commitSha = commit.sha;

                    const commitDetails = await getCommitDetails(apiUrl, githubToken, repoOwner, repoName, commitSha);

                    const linesChanged = commitDetails.stats.total || 0;

                    const simplifiedCommit = {
                        committer: contributorName,
                        lines_changed: linesChanged,
                        commit_message: commit.commit.message,
                        timestamp: convertUtcToBudapest(commit.commit.author.date) // Fix this line
                    };

                    simplifiedCommits.push(simplifiedCommit);

                    if (contributorName in contributorCommits) {
                        contributorCommits[contributorName] += 1;
                    } else {
                        contributorCommits[contributorName] = 1;
                    }
                }

                fs.writeFileSync('changes.json', JSON.stringify(simplifiedCommits, null, 2));
                fs.writeFileSync('contributors.json', JSON.stringify(contributorCommits, null, 2));

                console.log('JSON files updated.');
            }

            await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 seconds
        } catch (error) {
            console.error(`Error in main loop: ${error.message}`);
        }
    }
}


if (require.main === module) {
    jsonGenerator();
}
