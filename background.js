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
    });
});

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    switch (request.cmd) {
        case "authorize": authorize(); break;
    }
    return true;
});


function authorize() {
    console.log("Authorizing...");
    chrome.identity.getAuthToken({ 'interactive': true }, get_sheet);
}

loadScript('https://apis.google.com/js/client.js');

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

