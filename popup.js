document.addEventListener('DOMContentLoaded', async function () {
    const toggleButton = document.getElementById('toggle-js');
    const statusDiv = document.getElementById('status');
  
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.storage.local.get(['jsDisabled'], function (result) {
      const jsDisabled = result.jsDisabled || false;
      updateStatus(jsDisabled);
    });
  
    toggleButton.addEventListener('click', async function () {
      chrome.storage.local.get(['jsDisabled'], function (result) {
        const jsDisabled = !result.jsDisabled;
        chrome.storage.local.set({ jsDisabled: jsDisabled }, function () {
          updateStatus(jsDisabled);
          toggleJavaScript(tab.url, jsDisabled);
        });
      });
    });
  
    function updateStatus(jsDisabled) {
      statusDiv.textContent = jsDisabled ? 'JavaScript désactivé' : 'JavaScript activé';
      toggleButton.textContent = jsDisabled ? 'Activer JavaScript' : 'Désactiver JavaScript';
    }
  
    function toggleJavaScript(url, jsDisabled) {
      chrome.contentSettings.javascript.set({
        primaryPattern: '<all_urls>',
        setting: jsDisabled ? 'block' : 'allow'
      }, function () {
        chrome.tabs.reload(tab.id);
      });
    }
  });
  