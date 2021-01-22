from app.classes.sentence_comparator import SentenceComparator
from app.classes.file_loader import FileLoader
from app.classes.sentence_embedder import SentenceEmbedder
from app.classes.ner_identifier import NERIdentifier

comp = SentenceComparator()
comp.run()
comp.test()


#FileLoader().load_article()

#print(NERIdentifier().find_entities(["Milos Zeman je Národní knihovna"]))
