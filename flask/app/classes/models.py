import uuid

class Sentence:
    def __init__(self, sentence, article_id, article_url):
        self.id = uuid.uuid4()
        self.text = sentence
        self.article_url = article_url
        self.article_id = article_id

class Article:
    def __init__(self, url, sentences):
        self.id = uuid.uuid4()
        self.url = url
        self.whole_text = '. '.join(sentences)
        self.sentences = [Sentence(text, self.id, self.url) for text in sentences]

