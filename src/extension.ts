try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}
import * as vscode from "vscode";
import * as request from 'request-promise-native'; // Make sure to install the 'request-promise-native' package
const fs = require('fs');
const path = require('path');

import { EXTENSION_CONSTANT } from "constant";
import { LeftPanelWebview } from "providers/left-webview-provider";
import { jsonGenerator } from "../temalabor";
// import * as child_process from 'child_process';

interface CommitData {
    committer: string;
    lines_changed: number;
}
let intervalId;
// let pythonProcess;
const dynamicWebviews: { [id: string]: vscode.WebviewPanel } = {};

export function activate(context: vscode.ExtensionContext) {


  const dynamicWebviewTimers: { [id: string]: NodeJS.Timer } = {};
  initalize();
  // Időzítő beállítása 5 perces intervallummal
  intervalId = setInterval(() => {
    initalize();
  }, 60 * 1000);  // 60 másodperc * 1000 milliszekundum/másodperc

  function createAndShowWebview(command: string, title: string, contentFn: () => string) {
    // Webview törlése ha már létezik
    if (dynamicWebviews[command]) {
      dynamicWebviews[command].dispose();
  }

  // Ellenőrzi hogy timer megy-e már
  if (dynamicWebviewTimers[command]) {
      // Már létező timer törlése
      clearInterval(dynamicWebviewTimers[command]);
  }

    // Létrehoz és felmutat egy webview-t
    const panel = vscode.window.createWebviewPanel(
        'jsonlist',
        title,
        vscode.ViewColumn.One,
        {}
    );
    panel.webview.html = contentFn();

    // Referencia elmentése
    dynamicWebviews[command] = panel;

    // Új timer beálíttása
    dynamicWebviewTimers[command] = setInterval(() => {
        panel.webview.html = contentFn();
    }, 60 * 1000);  // 60 másodperc * 1000 milliszekundum/másodperc
  }
	// View regisztrálása
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

	// Listák regisztrálása
	context.subscriptions.push(
    vscode.commands.registerCommand('allTime.start', () => {
        createAndShowWebview('allTime', 'All Time list', () => getContent(readChangesJsonFile()));
    })
);

context.subscriptions.push(
    vscode.commands.registerCommand('daily.start', () => {
        createAndShowWebview('daily', 'Daily list', () => getContent(readDailyJsonFile()));
    })
);

context.subscriptions.push(
    vscode.commands.registerCommand('weekly.start', () => {
        createAndShowWebview('weekly', 'Weekly list', () => getContent(readWeeklyJsonFile()));
    })
);

context.subscriptions.push(
    vscode.commands.registerCommand('monthly.start', () => {
        createAndShowWebview('monthly', 'Monthly list', () => getContent(readMonthlyJsonFile()));
    })
);

};

function displayCommitsInHTML(data: CommitData[]): string {
    // Adatok csökkenő sorrendbe rendezése lines_changed alapján
    const sortedData = data.sort((a, b) => b.lines_changed - a.lines_changed);

    // HTML string létrehozása
    let html = '<ul>';

    sortedData.forEach(commit => {
        html += `<li>Committer: ${commit.committer} - Lines changed: ${commit.lines_changed}</li>`;
    });

    html += '</ul>';

    return html;
}

function getContent(jsonData): string {

    let commitsHtml = '';
    let imageUrl = 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif';

    if (jsonData && jsonData.length > 0) {
        commitsHtml = displayCommitsInHTML(jsonData);
    } else {
        commitsHtml = 'Noone did anything...';
        imageUrl = 'https://i.pinimg.com/originals/09/76/15/09761501f31eaf1c9995925a4dbb7dbf.jpg';
    }

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="./webview/webview.js"></script>
          <title>All Time Content</title>
      </head>
      <body>
          <img src="${imageUrl}" width="300" />
		  <div>${jsonData && jsonData.length > 0 ? 'The repository was modified by:' : ''}</div>
          <div id="results">${commitsHtml}</div>
      </body>
      </html>`;
}

function mergeCommitsByCommitter(data: CommitData[]): CommitData[] {
    const mergedData: Record<string, number> = {};

    data.forEach(commit => {
        const { committer, lines_changed } = commit;

        if (mergedData[committer] === undefined) {
            // lines_changed érték kezdeményezése ha ez az első alkalom
            mergedData[committer] = lines_changed;
        } else {
            // lines_changed összefésülése ugyannak a committernek
            mergedData[committer] += lines_changed;
        }
    });

    // Összefésült adatok vissza konvertálása CommitData tömbbe
    const mergedCommitData: CommitData[] = Object.keys(mergedData).map(committer => ({
        committer,
        lines_changed: mergedData[committer]
    }));

    return mergedCommitData;
}

function readChangesJsonFile(): CommitData[] | null {
    const workspacePath = vscode.workspace?.workspaceFolders?.[0]?.uri.fsPath || '';
    const filePath = path.join(workspacePath, 'changes.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        // lines_changed összefésülése ugyannak a committernek
        const mergedData = mergeCommitsByCommitter(jsonData);

        return mergedData;
    } catch (error) {
        console.error(`Error reading changes.json file: ${error.message}`);
        return null;
    }
}
function readDailyJsonFile(): CommitData[] | null {
    const workspacePath = vscode.workspace?.workspaceFolders?.[0]?.uri.fsPath || '';
    const filePath = path.join(workspacePath, 'daily.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        // lines_changed összefésülése ugyannak a committernek
        const mergedData = mergeCommitsByCommitter(jsonData);

        return mergedData;
    } catch (error) {
        console.error(`Error reading daily.json file: ${error.message}`);
        return null;
    }
}
function readWeeklyJsonFile(): CommitData[] | null {
    const workspacePath = vscode.workspace?.workspaceFolders?.[0]?.uri.fsPath || '';
    const filePath = path.join(workspacePath, 'weekly.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        // lines_changed összefésülése ugyannak a committernek
        const mergedData = mergeCommitsByCommitter(jsonData);

        return mergedData;
    } catch (error) {
        console.error(`Error reading weekly.json file: ${error.message}`);
        return null;
    }
}
function readMonthlyJsonFile(): CommitData[] | null {
    const workspacePath = vscode.workspace?.workspaceFolders?.[0]?.uri.fsPath || '';
    const filePath = path.join(workspacePath, 'monthly.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        // lines_changed összefésülése ugyannak a committernek
        const mergedData = mergeCommitsByCommitter(jsonData);

        return mergedData;
    } catch (error) {
        console.error(`Error reading monthly.json file: ${error.message}`);
        return null;
    }
}
  
async function fetchData() {
    try {
        // JSON beolvasása
        console.log('Fetching data...');
        
        // vscode.workspace stringgé alakíttása vagy üres string vissza adása ha nem lehet
        const workspacePath = vscode.workspace?.workspaceFolders?.[0]?.uri.fsPath || '';
        
        const filePath = path.join(workspacePath, 'changes.json');
        console.log('Root Path:', workspacePath);

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const commitsData = JSON.parse(fileContent);
        if (!commitsData || commitsData.length === 0) {
            vscode.window.showWarningMessage('No commit data found.');
            return;
        }

        // commitsData rendezése dátum szerint növekvő sorrendben
        commitsData.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateA.getTime() - dateB.getTime();
        });

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
	// vscode.workspace stringgé alakíttása vagy üres string vissza adása ha nem lehet
	const workspacePath = vscode.workspace?.workspaceFolders?.[0]?.uri.fsPath || '';
	const filePath = path.join(workspacePath, fileName);
	const jsonContent = JSON.stringify(summary, null, 2);
  
	try {
	  fs.writeFileSync(filePath, jsonContent);
	  console.log(`${fileName} created successfully at: ${filePath}`);
	} catch (error) {
	  console.error(`Error writing ${fileName}: ${error.message}`);
	}
  }

async function updateCommitData() {
    await fetchData();
}

/*function runPythonScript() {
    if (pythonProcess) {
        pythonProcess.kill();
    }
    const currentFilePath = __filename;
    const rootDirectory = path.join(path.dirname(currentFilePath), '..');
    const pythonScriptPath = path.join(rootDirectory, 'temalabor.py');

    // Spawn the Python process
    pythonProcess = child_process.spawn('python', [pythonScriptPath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python Script Output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Script Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python Script exited with code ${code}`);
    });
}*/
export async function initalize() {
  // runPythonScript();
  jsonGenerator();
  updateCommitData();
};

// Ez akkor fut le ha kikapcsol az extention
export function deactivate() {
  if (intervalId) {
    clearInterval(intervalId);
};
}