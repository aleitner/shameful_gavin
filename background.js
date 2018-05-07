const defaultOptions = {
  websites: 'www.pornhub.com, www.youporn.com',
  displayPopup: '1',
  playSound: '2',
  customPopup: 'Don\'t you have something better to do?',
  soundURL: ''
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
  chrome.storage.sync.get(defaultOptions, function(opts) {

    var websites = opts.websites.split(',');

    var url = new URL(tab.url)
    if (!websites.includes(url.hostname)) {
      console.log('Current tab is not on a shameful URL')
      return
    }
    console.log('Current tab is on a shameful URL')

    if (opts.playSound !== '0') {
      console.log('Audio will be played')
      var audio;

      if (opts.playSound === '1' && opts.soundURL !== '') {
        console.log('Playing audio by URL: ', opts.soundURL)
        audio = new Audio(opts.soundURL)
      } else {

        audio = new Audio();
        audio.src = "shame.mp3";
      }

      audio.oncanplay = function() {
        audio.play();
        popupCheckAndDisplay(opts);
      };

    } else {
      console.log('No audio will be played')
      popupCheckAndDisplay(opts);
    }

  });
}

function popupCheckAndDisplay(opts) {
  if (opts.displayPopup === '1') {
    console.log('Displaying popup')
    alert(opts.customPopup);
  } else {
    console.log('No popup will be display')
  }
}

// When browseraction icon is clicked
function click(e) {
  chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    getCurrentTab(function(currentTab) {
      shameHim(currentTab);
    });
  }
})

chrome.browserAction.onClicked.addListener(click);
