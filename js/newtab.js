function init() {
    chrome.tabs.onCreated.addListener(function (tab) {
        loadClock();
    });
}

function loadClock() {

}

init();