import requests
import json
import time

github_token = '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'
repo_owner = 'Balazs8'
repo_name = 'todo-app'
api_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/commits'

def main():
    while True:
        response = requests.get(api_url, headers={'Authorization': f'token {github_token}'})
        commits = response.json()

        if len(commits) > 0:
            simplified_commits = []  # List to store simplified commit information
            for commit in commits:
                simplified_commit = {
                    'committer': commit['commit']['committer']['name'],
                    'lines_changed': commit['stats']['total'] if 'stats' in commit and 'total' in commit['stats'] else 0,
                    'message': commit['commit']['message'],
                    'timestamp': commit['commit']['committer']['date'].replace('T', ' ').replace('Z', '')
                }
                simplified_commits.append(simplified_commit)
                print_commit_info(commit)

            with open('changes.json', 'w') as json_file:
                json.dump(simplified_commits, json_file, indent=2)  # Use 2 spaces for indentation

            print('Változás történt. JSON fájl frissítve.')

        time.sleep(20)  # Várakozás 1 perc, majd újra lekérdezés

def print_commit_info(commit):
    try:
        print(f"Committer: {commit['commit']['committer']['name']}")
        print(f"Lines changed: {commit['stats']['total']}")
        print(f"Message: {commit['commit']['message']}")
        print(f"Timestamp: {commit['commit']['committer']['date'].replace('T', ' ').replace('Z', '')}")
        print("------------------------------")
    except KeyError:
        print("")

if __name__ == "__main__":
    main()
