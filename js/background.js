chrome.browserAction.onClicked.addListener(function(e){
    chrome.runtime.openOptionsPage(function(){

    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var url = request.url;
    var rule = JSON.parse( localStorage.getItem('rules') ).find( function(r){
        return url.indexOf(r.url) != -1;
    });
    chrome.tabs.executeScript(null, {
        code: rule.jscode || ';'
    });
    sendResponse({
        msg: "ok"
    })
});
