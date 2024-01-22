try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}
import * as vscode from "vscode";
const fs = require('fs');
const path = require('path');

import { EXTENSION_CONSTANT } from "constant";
import { LeftPanelWebview } from "providers/left-webview-provider";

interface CommitData {
    committer: string;
    lines_changed: number;
}

export function activate(context: vscode.ExtensionContext) {
	updateCommitData();
	let helloWorldCommand = vscode.commands.registerCommand(
		"vscode-webview-extension-with-react.helloWorld",
		() => {
			vscode.window.showInformationMessage(
				"Hello World from vscode-webview-extension-with-react!"
			);
		}
	);
	context.subscriptions.push(helloWorldCommand);

	// Register view
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

	// Listák regisztrálása
	context.subscriptions.push(
		vscode.commands.registerCommand('allTime.start', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'jsonlist', // Identifies the type of the webview. Used internally
			'All Time list', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		  panel.webview.html = getContent(readChangesJsonFile());
		})
	  );
	  context.subscriptions.push(
		vscode.commands.registerCommand('daily.start', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'jsonlist', // Identifies the type of the webview. Used internally
			'Daily list', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		  panel.webview.html = getContent(readDailyJsonFile());
		})
	  );
	  context.subscriptions.push(
		vscode.commands.registerCommand('weekly.start', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'jsonlist', // Identifies the type of the webview. Used internally
			'Weekly list', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		  panel.webview.html = getContent(readWeeklyJsonFile());
		})
	  );
	  context.subscriptions.push(
		vscode.commands.registerCommand('monthly.start', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'jsonlist', // Identifies the type of the webview. Used internally
			'Monthly list', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		  panel.webview.html = getContent(readMonthlyJsonFile());
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
        commitsHtml = 'Senki se dolgozott...';
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
		  <div>${jsonData && jsonData.length > 0 ? 'A repo All-time modosíttói:' : ''}</div>
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
    const filePath = path.join(__dirname, 'changes.json');

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
    const filePath = path.join(workspacePath, 'output', 'daily.json');

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
    const filePath = path.join(workspacePath, 'output', 'weekly.json');

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
    const filePath = path.join(workspacePath, 'output', 'monthly.json');

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
	const filePath = path.join(workspacePath, 'output', fileName);
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

// Ez akkor fut le ha kikapcsol az extention
export function deactivate() {}
