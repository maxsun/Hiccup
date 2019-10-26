// chrome.commands.onCommand.addListener(function(command) {
//   if (command == "toggle-pin") {
//     // Get the currently selected tab
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       // Toggle the pinned status
//       var current = tabs[0]
//       chrome.tabs.update(current.id, {'pinned': !current.pinned});
//     });
//   }
// });

// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//   console.log(tabs[0]);
// });

// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
//     console.log(url);
// });

chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {
       chrome.extension.getBackgroundPage().console.log(tab.url);
});

// Do NOT forget that the method is ASYNCHRONOUS
// chrome.tabs.query({
//     active: true,               // Select active tabs
//     currentWindow: true     // In the current window
// }, function(tabs) {
//     // Since there can only be one active tab in one active window, 
//     //  the array has only one element
//     var tab = tabs[0];
//     // Example:
//     var url = tab.url;
//     chrome.extension.getBackgroundPage().console.log(url);
//     // ... do something with url variable
// });