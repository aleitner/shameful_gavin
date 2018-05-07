const defaultOptions = {
  websites: 'www.pornhub.com, www.xvideos.com, www.redtube.com, www.xhamster.com',
  displayPopup: true,
  playSound: true
};

function toggleDiv(id) {
    var div = document.getElementById(id);
    div.style.display = (div.style.display === "none") ? "block" : "none";
}

// Saves options to chrome.storage
function save_options() {

  /* Account */
  var websites = document.getElementById('websites').value.replace(/\s/g, "");
  var displayPopup = document.getElementById('displayPopup').checked;
  var playSound = document.getElementById('playSound').checked;


  chrome.storage.sync.set({
    websites: websites,
    displayPopup: displayPopup,
    playSound: playSound
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
    websites: "",
    displayPopup: false,
    playSound: false
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
    document.getElementById('displayPopup').checked = items.displayPopup;
    document.getElementById('playSound').checked = items.playSound;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', clear_options);
