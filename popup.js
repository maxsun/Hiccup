
function handleAuthClick(event) {
    chrome.runtime.sendMessage({ cmd: 'authorize' });
}

window.onload = function () {
    let authorizeButton = document.getElementById('authorize_button');
    authorizeButton.onclick = handleAuthClick
}
