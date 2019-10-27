console.log("Background js running...");

let manifestData = chrome.runtime.getManifest();
let authorizationObject = {
    client_id: manifestData.oauth2.client_id,
    immediate: true,
    scope: manifestData.oauth2.scopes.join(', ')
}

chrome.tabs.onActivated.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.extension.getBackgroundPage().console.log(activeTab.url);
        chrome.extension.getBackgroundPage().console.log(activeTab.title);
        console.log(Date.now());

        // attempt to write the row to the sheet
        chrome.storage.sync.get('HICCUP_SHEET', function (items) {
            if (Object.keys(items).length == 0) {
                // no sheet id found
                console.log('RUNNING CREATE SHEET');
                runGAPICall(create_sheet, function (created_sheet) {
                    let sheet_id = created_sheet.result.spreadsheetId
                    console.log('CREATED SHEET')
                    console.log(sheet_id);
                    // copy files into this sheet
                    chrome.storage.sync.set({ 'HICCUP_SHEET': sheet_id }, function () {
                        runGAPICall(copy_sheet, sheet_id);
                    });
                });
            }
            // write to google sheet
            console.log(items['HICCUP_SHEET']);
        });
    });
});

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    switch (request.cmd) {
        case "authorize": authorize(); break;
    }
    return true;
});

//acquire gapi authentication
function authorize() {
    chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
        window.gapi_onload = function () {
            gapi.auth.authorize(
                {
                    client_id: manifestData.oauth2.client_id,
                    immediate: true,
                    scope: manifestData.oauth2.scopes.join(', ')
                },
                function () {
                    gapi.client.load('sheets', 'v4', function () {
                        gapi.auth.setToken({ access_token: token });
                    });
                });
        };
        loadScript('https://apis.google.com/js/client.js');
    });
}

function runGAPICall(toCall, callback) {
    chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
        window.gapi_onload = function () {
            gapi.auth.authorize(
                {
                    client_id: manifestData.oauth2.client_id,
                    immediate: true,
                    scope: manifestData.oauth2.scopes.join(', ')
                },
                function () {
                    gapi.client.load('sheets', 'v4', function () {
                        gapi.auth.setToken({ access_token: token });
                        toCall(gapi, callback);
                    });
                });
        };
        loadScript('https://apis.google.com/js/client.js');
    });
}

function loadScript(url) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            return;
        }
        if (request.status !== 200) {
            return;
        }
        eval(request.responseText);
    };
    request.open('GET', url);
    request.send();
}

