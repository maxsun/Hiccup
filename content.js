// var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert("yo");

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	if (request.message === "activeTab") {
// 	chrome.tabs.query({active: true,currentWindow: true}, function(tabs) {
//     var tab = tabs[0];
//     var url = tab.url;
//     console.log(url);
//     // ... do something with url variable
// });
//   	}
//   }
// );



//background.js scratch work
// console.logCopy = console.log.bind(console);

// console.log = function(data)
// {
//     var currentDate = '[' + new Date().toUTCString() + '] ';
//     this.logCopy(currentDate, data);
// };

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

// chrome.tabs.onActivated.addListener( function( tabId, windowId) {
//     chrome.tabs.query({
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
// });