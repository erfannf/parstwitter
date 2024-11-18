document.addEventListener('DOMContentLoaded', function() {
  const fontSelector = document.getElementById('fontSelector');
  const preview = document.getElementById('preview');
  const status = document.getElementById('status');
  
  // Load saved font preference
  chrome.storage.sync.get(['persianFont'], function(result) {
    if (result.persianFont) {
      fontSelector.value = result.persianFont;
      preview.style.fontFamily = result.persianFont;
    }
  });
  
  // Handle font changes
  fontSelector.addEventListener('change', function() {
    const selectedFont = fontSelector.value;
    
    // Update preview
    preview.style.fontFamily = selectedFont;
    
    // Save preference
    chrome.storage.sync.set({
      persianFont: selectedFont
    }, function() {
      // Show status
      status.classList.add('visible');
      setTimeout(() => {
        status.classList.remove('visible');
      }, 2000);
    });
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'changeFont',
        font: selectedFont
      });
    });
  });
});