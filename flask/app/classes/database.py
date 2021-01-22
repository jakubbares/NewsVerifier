import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from app.classes.logger import Logger
from app.classes.models import Article

class Database:
    def __init__(self):
        cred = credentials.Certificate('firestore_config.json')
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        self.logger = Logger().logger
        self.logger.info("Database ready to query")

    @property
    def articles_ref(self):
        return self.db.collection(u'articles')

    def load_articles(self):
        return self.articles_ref.stream()

    def update_article(self, article):
        transaction = self.db.transaction()
        article_ref = self.articles_ref.document(article.id)
        result = self.update_article_in_transaction(transaction, article_ref)

    def save_article(self, article):
        batch = self.db.batch()

        article_ref = self.articles_ref.document(article.id)
        batch.set(article_ref, {u'name': u'New York City'})

        sentences_ref = article_ref.collection("sentences")
        for sentence in article.sentences:
            sentence_ref = sentences_ref.document(sentence.id)
            batch.set(sentence_ref,  {u'name': u'New York City'})

        batch.commit()


    @firestore.transactional
    def update_article_in_transaction(self, transaction, city_ref):
        snapshot = city_ref.get(transaction=transaction)
        new_population = snapshot.get(u'population') + 1

        if new_population < 1000000:
            transaction.update(city_ref, {
                u'population': new_population
            })
            return True
        else:
            return False
