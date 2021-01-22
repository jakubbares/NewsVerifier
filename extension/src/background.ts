chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' });
  chrome.browserAction.onClicked.addListener((tab) => {
    chrome.runtime.sendMessage({
      type: 'process-content'
    });
  });
});






