async function pageFunction(context) {
    const { request, log, skipLinks, jQuery: $ } = context;
    log.info ('running');
    //title hazi chybu
    //const title = request.querySelector('title').textContent;
    log.info(`URL: ${request.url}`); // TITLE: ${title}`);
    if (request.userData.label === 'START' || request.userData.label === 'PAGINATION') {
        log.info('Pagination');
    }else{
        log.info('Detail');
        await skipLinks();
        let data = {
            url: request.url,
            //tady bych potreboval vyndat h2, co maji v class heading
            name: $('div.b-article__lead p').text().trim(),
            tags: $('div.b-article__refs-tags').text().trim(),
            text: toTxt($('div.b-article__text p'))
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