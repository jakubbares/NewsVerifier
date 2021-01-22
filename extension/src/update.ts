console.log('Updating page');

function updateContent(targetLanguage, detectedLanguage, userId) {
  const el = document.querySelector('app-content');
  el.setAttribute('detected', detectedLanguage);
  el.setAttribute('target', targetLanguage);
  el.setAttribute('uid', userId);
}

chrome.runtime.sendMessage({
  type: 'update'
}, ({ targetLanguage, detectedLanguage, userId }) => {
  updateContent(targetLanguage, detectedLanguage, userId);
});


