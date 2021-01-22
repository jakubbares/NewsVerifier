from newspaper import Article


class ArticleDownloader:
    def __init__(self):
        url = "https://www.novinky.cz/domaci/clanek/praktiky-z-vychodu-je-to-magor-reaguji-politici-na-potycku-ve-snemovne-40348593"
        url = 'http://fox13now.com/2013/12/30/new-year-new-laws-obamacare-pot-guns-and-drones/'
        self.article = Article(url)

    def download(self):
        self.article.download()
        self.article.parse()
        print(self.article.text)



ArticleDownloader().download()
