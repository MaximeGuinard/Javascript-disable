chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ jsDisabled: false });
  });
  