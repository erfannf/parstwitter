// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'changeFont') {
    try {
      // Remove existing style element if it exists
      const existingStyle = document.getElementById('persian-font-style');
      if (existingStyle) {
        existingStyle.remove();
      }

      // If not default font, inject new style
        if (request.font !== 'system-ui') {
            const style = document.createElement('style');
            style.id = 'persian-font-style';
            style.textContent = `
          .r-poiln3 {
            font-family: ${request.font} !important;
          }
        `;
            document.head.appendChild(style);
        } else { 
            const style = document.createElement('style');
            style.id = 'system-font-style';
            style.textContent = `
          .r-poiln3 {
            font-family:inherit !important;
          }
        `;
            document.head.appendChild(style);
        }
      
      sendResponse({ status: 'success' });
    } catch (error) {
      console.error('Error applying font:', error);
      sendResponse({ status: 'error', message: error.message });
    }
  }
  return true;
});

// Apply saved font preference on page load
chrome.storage.sync.get(['persianFont'], result => {
  if (result.persianFont && result.persianFont !== 'system-ui') {
    const style = document.createElement('style');
    style.id = 'persian-font-style';
    style.textContent = `
      .r-poiln3 {
        font-family: ${result.persianFont} !important;
      }
    `;
    document.head.appendChild(style);
  }
});