let angularScript = document.createElement('script');
angularScript.setAttribute('id', 'angularScript');
angularScript.type = 'text/javascript';
angularScript.src = chrome.extension.getURL('elements.js');

const pageTitle = document.title;

console.log('Processing page');

function createContent({sentences, article, userId}) {
  const el = document.createElement('app-content');
  el.setAttribute('uid', userId);
  el.setAttribute('sentences', JSON.stringify(sentences));
  el.setAttribute('article', JSON.stringify(article));
  const base = document.getElementsByTagName("body")[0];
  try {
    document.body.appendChild(el);
  } catch (e) {
    console.log(e);
  }
}

chrome.runtime.sendMessage({
  type: 'start',
  innerHTML: document.body.innerHTML,
  url: document.location.href,
  pageTitle: document.title
}, ({ userId, article, sentences }) => {
  console.log('Received data from popup');
  angularScript.onload = () => {
    createContent({sentences, article, userId});
    document.title = pageTitle;
  };
  try {
    (document.head || document.documentElement).appendChild(angularScript);
  } catch (e) {
    console.log(e);
  }
});
document.title = 'Processing';

