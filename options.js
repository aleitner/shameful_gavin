const defaultOptions = {
  websites: 'www.pornhub.com, www.youporn.com',
  displayPopup: '1',
  playSound: '2',
  customPopup: 'Don\'t you have something better to do?',
  soundURL: ''
};

// Saves options to chrome.storage
function save_options() {

  /* Account */
  var websites = document.getElementById('websites').value.replace(/\s/g, "");
  var displayPopup = document.querySelector('input[name="displayPopup"]:checked').value;
  var playSound = document.querySelector('input[name="playSound"]:checked').value;
  var customPopup = document.getElementById('customPopup').value;
  var soundURL = document.getElementById('soundURL').value;

  chrome.storage.sync.set({
    websites: websites,
    displayPopup: displayPopup,
    playSound: playSound,
    customPopup: customPopup,
    soundURL: soundURL
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.style.display = 'block';
    setTimeout(function() {
      status.textContent = '';
      status.style.display = 'none';
    }, 750);
  });
}

function clear_options() {

  /* Account */
  chrome.storage.sync.set({
    websites: '',
    displayPopup: '0',
    playSound: '0',
    customPopup: '',
    soundURL: ''
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.style.display = 'block';
    setTimeout(function() {
      status.textContent = '';
      status.style.display = 'none';
    }, 750);

    restore_options();
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(defaultOptions, function(items) {
    document.getElementById('websites').value = items.websites;
    document.getElementById('displayPopup'+items.displayPopup).checked = true;
    document.getElementById('playSound'+items.playSound).checked = true;
    document.getElementById('customPopup').value = items.customPopup;
    document.getElementById('soundURL').value = items.soundURL;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
