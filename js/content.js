!function () {
    chrome.runtime.sendMessage({
        site: document.location
    }, function(response){
        // console.log('response => ', response);
    });
}();
