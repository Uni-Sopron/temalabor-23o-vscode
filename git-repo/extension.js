const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


vscode.commands.registerCommand('git-repo.startGitHubCommitCounter', fetchData);

const outputChannel = vscode.window.createOutputChannel('GitHub Commit Counter');
outputChannel.show();

let panel;
panel.webview.onDidReceiveMessage(
  message => {
    switch (message.command) {
      case 'displayData':
        // Adatok feldolgozása és webview frissítése ha szükséges
        break;
      default:
        console.error('Unexpected message:', message);
    }
  },
  undefined,
  context.subscriptions
);

async function fetchData() {
  try {
    // JSON beolvasása
    console.log('Fetching data...');
    const filePath = path.join(vscode.workspace || '', 'changes.json');
    console.log('Root Path:', vscode.workspace);

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const commitsData = JSON.parse(fileContent);
    if (!commitsData || commitsData.length === 0) {
      vscode.window.showWarningMessage('No commit data found.');
      return;
    }

    // commitsData rendezése dátum szerint növekvő sorrendben
    commitsData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // commitsData feldolgozása napi, heti, és havi összefoglalókba
    const dailySummary = createSummary(commitsData, 'daily');
    const weeklySummary = createSummary(commitsData, 'weekly');
    const monthlySummary = createSummary(commitsData, 'monthly');

    // Az összefoglalók lementése JSON file ként
    console.log('Saving summaries...');
    saveSummaryToFile(dailySummary, 'daily.json');
    saveSummaryToFile(weeklySummary, 'weekly.json');
    saveSummaryToFile(monthlySummary, 'monthly.json');

    vscode.window.showInformationMessage('GitHub Commit Counter updated successfully.');
  } catch (error) {
    vscode.window.showErrorMessage(`Error reading data: ${error.message}`);
  }
}

function createSummary(commitsData, intervalType) {
  const summary = {};
  const now = new Date();

  commitsData.forEach(commit => {
    const commitDate = new Date(commit.timestamp);

    // Annak leenőrzése hogy egy commit adat egy adott dátumon belül van-e
    const isInInterval = checkInterval(commitDate, now, intervalType);

    if (isInInterval) {
      // Létrehoz vagy módosítt felhasználóhoz kötve
      if (!summary[commit.committer]) {
        summary[commit.committer] = {
          committer: commit.committer,
          lines_changed: 0,
        };
      }

      // Hozzáad a lines_changed adathoz
      summary[commit.committer].lines_changed += commit.lines_changed;
    }
  });

  // Konvertálja a summary objectumot egy tömbbé és returnöli
  return Object.values(summary);
}

function checkInterval(commitDate, currentDate, intervalType) {
  switch (intervalType) {
    case 'daily':
      return commitDate.getDate() === currentDate.getDate() &&
             commitDate.getMonth() === currentDate.getMonth() &&
             commitDate.getFullYear() === currentDate.getFullYear();
    case 'weekly':
      return commitDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()) &&
             commitDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7);
    case 'monthly':
      return commitDate.getMonth() === currentDate.getMonth() &&
             commitDate.getFullYear() === currentDate.getFullYear();
    default:
      return false;
  }
}

function saveSummaryToFile(summary, fileName) {
  const filePath = path.join(vscode.workspace, 'output', fileName);
  const jsonContent = JSON.stringify(summary, null, 2);

  try {
    fs.writeFileSync(filePath, jsonContent);
    console.log(`${fileName} created successfully at: ${filePath}`);
  } catch (error) {
    console.error(`Error writing ${fileName}: ${error.message}`);
  }
}

function activate(context) {
  console.log('Activating Git Repo extension...');

  // webview panel initalizálása
  panel = vscode.window.createWebviewPanel(
    'commitCounter',
    'Commit Counter',
    vscode.ViewColumn.One,
    {}
  );

  console.log('Git Repo extension activated.');

  // command felvétele
  context.subscriptions.push(
    vscode.commands.registerCommand('git-repo.showCommitCounter', () => {
      console.log('Showing Commit Counter...');

      const htmlPath = path.join(__dirname, 'webview', 'index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      panel.webview.html = htmlContent;

      const monthlyData = loadJsonData('monthly.json', context);
      panel.webview.postMessage({
        command: 'displayData',
        data: monthlyData,
      });
    })
  );
}

function loadJsonData(fileName, context) {
  const filePath = path.join(context.extensionPath, 'output', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

module.exports = {
  activate,
  fetchData,
  createSummary,
  checkInterval,
  saveSummaryToFile
};

