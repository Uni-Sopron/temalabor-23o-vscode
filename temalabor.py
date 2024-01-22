import requests
import json
import time
from datetime import datetime, timedelta

budapest_timezone = timedelta(hours=1)
repo_adatok_file = 'repo_adatok.json'

def read_repo_adatok():
    try:
        with open(repo_adatok_file, 'r') as file:
            repo_adatok = json.load(file)
        return repo_adatok
    except FileNotFoundError:
        print(f'A(z) {repo_adatok_file} fájl nem található.')
        return None
    except json.JSONDecodeError:
        print(f'A(z) {repo_adatok_file} fájl nem érvényes JSON formátumot tartalmaz.')
        return None

def get_commit_details(api_url, github_token, owner, repo, sha):
    commit_url = f'{api_url}/repos/{owner}/{repo}/commits/{sha}'
    headers = {'Authorization': f'token {github_token}'}
    response = requests.get(commit_url, headers=headers)
    return response.json()

def main():
    repo_adatok = read_repo_adatok()

    if not repo_adatok:
        return

    repo_owner = repo_adatok.get('repo_owner')
    repo_name = repo_adatok.get('repo_name')
    github_token = repo_adatok.get('github_token')

    if not (repo_owner and repo_name and github_token):
        print('Hiányzó adatok a repo_adatok.json fájlban.')
        return

    api_url = 'https://api.github.com'

    while True:
        response = requests.get(f'{api_url}/repos/{repo_owner}/{repo_name}/commits', headers={'Authorization': f'token {github_token}'})
        commits = response.json()

        if len(commits) > 0:
            simplified_commits = []
            contributor_commits = {}

            for commit in commits:
                contributor_name = commit['commit']['author']['name']  # Fix this line
                commit_sha = commit['sha']

                # Részletes commit információk lekérése
                commit_details = get_commit_details(api_url, github_token, repo_owner, repo_name, commit_sha)

                # Felhasználjuk az author és committer mezőket a változott sorok számának meghatározására
                lines_changed = commit_details['stats']['total'] if commit_details.get('stats') else 0

                simplified_commit = {
                    'committer': contributor_name,
                    'lines_changed': lines_changed,
                    'commit message': commit['commit']['message'],
                    'timestamp': convert_utc_to_budapest(commit['commit']['author']['date'])  # Fix this line
                }
                simplified_commits.append(simplified_commit)

                # Update contributor_commits dictionary
                if contributor_name in contributor_commits:
                    contributor_commits[contributor_name] += 1
                else:
                    contributor_commits[contributor_name] = 1

            with open('changes.json', 'w') as json_file:
                json.dump(simplified_commits, json_file, indent=2)
            with open('contributors.json', 'w') as contributors_file:
                json.dump(contributor_commits, contributors_file, indent=2)

            print('JSON fájlok frissítve.')

        time.sleep(5)

def convert_utc_to_budapest(utc_timestamp):
    utc_time = datetime.strptime(utc_timestamp, '%Y-%m-%dT%H:%M:%SZ')
    budapest_time = utc_time + budapest_timezone
    return budapest_time.strftime('%Y-%m-%d %H:%M:%S')

if __name__ == "__main__":
    main()
