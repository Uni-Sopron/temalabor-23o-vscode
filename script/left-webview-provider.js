(function () {
    const vscode = acquireVsCodeApi();
    document.getElementById(ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON).addEventListener('click', ()=> {
        vscode.postMessage({ 
            action: POST_MESSAGE_ACTION.SHOW_WARNING_LOG, 
            data: {
                message: "You just selected the show All-time option"
        }});
    });
    document.getElementById(ELEMENT_IDS.TRIGGER_DAILY_BUTTON).addEventListener('click', ()=> {
        vscode.postMessage({ 
            action: POST_MESSAGE_ACTION.SHOW_DAILY_WARNING_LOG, 
            data: {
                message: "You just selected the show daily option"
        }});
    });
    document.getElementById(ELEMENT_IDS.TRIGGER_WEEKLY_BUTTON).addEventListener('click', ()=> {
        vscode.postMessage({ 
            action: POST_MESSAGE_ACTION.SHOW_WEEKLY_WARNING_LOG, 
            data: {
                message: "You just selected the show weekly option"
        }});
    });
    document.getElementById(ELEMENT_IDS.TRIGGER_MONTHLY_BUTTON).addEventListener('click', ()=> {
        vscode.postMessage({ 
            action: POST_MESSAGE_ACTION.SHOW_MONTHLY_WARNING_LOG, 
            data: {
                message: "You just selected the show monthly option"
        }});
    });
}());