
let currentPage = location.href;

setInterval(() => {
  console.log(currentPage, location.href)
  if (currentPage !== location.href) {
    console.log('Updating URL');
    chrome.runtime.sendMessage({
      type: 'url-change',
      url: location.href
    }, () => {
      console.log('URL updated');
    });
    currentPage = location.href;
  }
}, 1000);
