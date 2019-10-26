// var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert("yo");
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    alert(url);
});