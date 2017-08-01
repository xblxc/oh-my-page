!function () {
    chrome.runtime.sendMessage({
        url: document.location.href,
    }, function(response){
        // console.log('response => ', response);
    });
}();
