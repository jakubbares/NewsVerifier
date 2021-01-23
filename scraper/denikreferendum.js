async function pageFunction(context) {
    const { request, log, skipLinks, jQuery: $ } = context;
    if (request.userData.label === 'START') {
        log.info('url list init')
        var i;
        for (i = 2; i < 20; i++) { 
            context.enqueueRequest({ url: 'https://data.denikreferendum.cz/article/search/a/' + i, userData: {"label": "PAGINATION"} });
            log.info('adding - ' +({ url: 'https://data.denikreferendum.cz/article/search/a/' + i}).url);
        }
    }
    log.info ('running '+ request.url)
    if (request.userData.label === 'START' || request.userData.label === 'PAGINATION') {
        log.info('Extracting articles');
        var xJSON = JSON.parse($('body').text());
        for (const article of xJSON.articles){
            log.info('Enqueue ' + article.canonicalUrl);
            context.enqueueRequest({ url: 'https://denikreferendum.cz/clanek/' + article.canonicalUrl });
        }
        
    }
    else {
        log.info('Scraping article - ' + $('.header h2').text().trim())
        await skipLinks();
        let data = {
            url: request.url,
            name: $('.header h2').text().trim(),
            perex: $('.perex').text().trim(),
            //date: $('.articleDateTime.svelte-13gsx8e').attr('content'),
            text: toTxt($('.text')),
            datum: toTxt($('.articleDateTime'))
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