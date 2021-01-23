async function pageFunction(context) {
    const { request, log, skipLinks, jQuery: $ } = context;
    const title = document.querySelector('title').textContent;
    log.info(`URL: ${request.url} TITLE: ${title}`);
    if (request.userData.label === 'START' || request.userData.label === 'PAGINATION') {
        log.info('Pagination');
    }
    if (request.userData.label === 'DETAIL') {
        log.info('Details');
        await skipLinks();
         let data = {
        //     url: request.url,
             name: $('h1.mt--00').text().trim(),
        //     date: $('.art-full .time-date').attr('content'),
             opener: toTxt($('header > p.text-bold--m')),
             text: toTxt($('div.b-detail > p')),
             tags: ''
        };
        return data;
    }

    function filterDom(obj) {
       var o= obj.clone()
            .find("script,noscript,style,[id^=anketa]")
            .remove()
            .end();
       return o;
    }
    function filterTxt(txt) {
      var t = txt
            .replace(/[^\S\n ]/g, ' ')
            .replace(/^\s*/gim, '')
            .replace(/\n{2,}/g, '\n')
            .trim();
      return t;
    }
    
    function toTxt(obj) {
        var txt = filterDom(obj).text();
        return filterTxt(txt);
    }
}