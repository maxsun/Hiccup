
function handleAuthClick(event) {
    chrome.runtime.sendMessage({ cmd: 'authorize' });
}

function handleViewLogClick(event) {
    console.log('Show log here!');
    // chrome.runtime.sendMessage({ cmd: 'show_log' });
}

window.onload = function () {
    let authorizeButton = document.getElementById('authorize_button');
    authorizeButton.onclick = handleAuthClick;

    let logButton = document.getElementById('view_log');
    logButton.onclick = handleViewLogClick;
}
