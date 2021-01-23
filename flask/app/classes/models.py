import uuid

class Sentence:
    def __init__(self, sentence, article_id, article_url):
        self.id = uuid.uuid4()
        self.text = sentence
        self.article_url = article_url
        self.article_id = article_id

class Article:
    def __init__(self, url, title, text):
        self.id = uuid.uuid4()
        self.url = url
        self.title = title
        self.text = text

    def set_sentences(self, sentences):
        self.sentences = sentences
