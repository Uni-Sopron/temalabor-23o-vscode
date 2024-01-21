import requests
import json
import time
from datetime import datetime, timedelta

github_token = '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'
repo_owner = 'Balazs8'
repo_name = 'beadando'
api_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/commits'

budapest_timezone = timedelta(hours=1)

def main():
    while True:
        response = requests.get(api_url, headers={'Authorization': f'token {github_token}'})
        commits = response.json()

        if len(commits) > 0:
            simplified_commits = []
            contributor_commits = {}  # Track commits per contributor

            for commit in commits:
                contributor_name = commit['commit']['committer']['name']

                simplified_commit = {
                    'committer': contributor_name,
                    'lines_changed': commit['stats']['total'] if commit.get('stats') and commit['stats'].get('total') else 0,
                    'commit message': commit['commit']['message'],
                    'timestamp': convert_utc_to_budapest(commit['commit']['committer']['date'])
                }
                simplified_commits.append(simplified_commit)

                # Update contributor_commits dictionary
                if contributor_name in contributor_commits:
                    contributor_commits[contributor_name] += 1
                else:
                    contributor_commits[contributor_name] = 1

            with open('changes.json', 'w') as json_file:
                json.dump(simplified_commits, json_file, indent=2)  # Use 2 spaces for indentation

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
