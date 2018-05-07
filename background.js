const defaultOptions = {
  websites: '',
  displayPopup: false,
  playSound: false
};

function getCurrentTab(callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    callback(tabs[0]);
  });
}

function shameHim(tab) {
  chrome.storage.sync.get(defaultOptions, function(options) {

    var websites = options.websites.split(',');

    var url = new URL(tab.url)
    if (!websites.includes(url.hostname)) {
      return
    }

    if (options.playSound == true) {
      var myAudio = new Audio();
      myAudio.src = "shame.mp3";
      myAudio.oncanplay = function() {
        myAudio.play();
        if (options.displayPopup == true) {
          alert("Get off this website you naughty boi~")
        }
      };
    }
  });
}

// When there is a request made for preferences.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "getOptions") {
      // Get preferences from local storage
      chrome.storage.sync.get(defaultOptions, function(options) {
        sendResponse(options);
      }
    );
  }
  return true;
});

// When browseraction icon is clicked
function click(e) {
  chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    getCurrentTab(function(currentTab) {
      console.log(currentTab)
      shameHim(currentTab);
    });
  }
})

chrome.browserAction.onClicked.addListener(click);
