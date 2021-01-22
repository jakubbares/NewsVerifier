from app.classes.logger import Logger
from app.classes.models import Article

class FileLoader:
    def __init__(self):
        pass

    def load_article(self):
        file = open("saved_files/article.txt").read()
        sentences = [sentence for sentence in file.split("\n") if len(sentence) > 0]
        url = "https://www.idnes.cz/zpravy/domaci/jednani-vlady-prodlouzeni-nouzoveho-stavu-koronavirus-pes.A210122_042925_domaci_kop"
        article = Article(url, sentences)
        return article
