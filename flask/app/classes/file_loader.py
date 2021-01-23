from app.classes.logger import Logger
from app.classes.models import Article, Sentence
import json
import spacy

class FileLoader:
    def __init__(self):
        self.model = spacy.load("en_core_web_lg")

    def break_to_sentences(self, text):
        doc = self.model(text)
        return [phrase for phrase in doc.sents]

    def load_from_txt(self):
        file = open("saved_files/article.txt").read()
        sentences = [sentence for sentence in file.split("\n") if len(sentence) > 0]
        url = "https://www.idnes.cz/zpravy/domaci/jednani-vlady-prodlouzeni-nouzoveho-stavu-koronavirus-pes.A210122_042925_domaci_kop"
        article = Article(url, "Title", ' '.join(sentences))
        return article

    def load_from_json(self):
        file = open("saved_files/denikreferendum.json")
        articles = [Article(j["url"], j["name"], j["text"]) for j in json.load(file)]
        results = []
        for article in articles:
            sentences = [Sentence(phrase, article.id, article.url) for phrase in self.break_to_sentences(article.text)]
            article.set_sentences(sentences)
            results.append(article)
        return results
