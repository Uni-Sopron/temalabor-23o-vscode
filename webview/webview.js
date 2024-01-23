/* global window, document */
import * as vscode from 'vscode';

vscode.postMessage({ command: 'loadData' });

window.addEventListener('message', event => {
  const message = event.data;
  if (message.command === 'displayData') {
    displayData(message.data);
  }
});

function displayData(data) {
  console.log('Received data:', data);
  // Adat rendezése csökkenő sorrendben lines changed alapján
  const sortedData = data.sort((a, b) => b.lines_changed - a.lines_changed);

  // Megvárja hogy a DOM betöltsön
  document.addEventListener('DOMContentLoaded', () => {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '<h2>This month:</h2>';

    // A rendezett adatok átadása a webview-nek
    sortedData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.committer} - ${item.lines_changed} lines changed`;
      resultsElement.appendChild(listItem);
    });
  });
}
