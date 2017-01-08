chrome.browserAction.onClicked.addListener(function(e){
    chrome.runtime.openOptionsPage(function(){

    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var url = request.site.origin + request.site.pathname.replace(/\/$/, '');
    var rule = JSON.parse( localStorage.getItem('rules') ).find( function(r){
        return r.url == url || r.url == url + '/';
    });
    chrome.tabs.executeScript(null, {
        //  http://xx.com or http://xx.com/
        code: rule.jscode || ';'
    });
    sendResponse({
        msg: "ok"
    })
});
