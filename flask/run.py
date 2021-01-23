from app.classes.sentence_comparator import SentenceComparator
from app.classes.file_loader import FileLoader
from app.classes.sentence_embedder import SentenceEmbedder
from app.classes.ner_identifier import NERIdentifier
"""
comp = SentenceComparator()
comp.prepare()
comp.test()
"""

#FileLoader().load_article()
text = """Šéf komunistů Vojtěch Filip po schůzce s premiérem Andrejem Babišem řekl, že německá kancléřka 
Angela Merkel bude prosazovat, aby Evropská unie nakupovala vakcíny i mimo Unii, v Rusku a Číně. Babiš ale iDNES.cz řekl, 
že s německou kancléřkou mluvil o tom, že Evropa by měla usilovat o svoji vlastní vakcínu."""

print(NERIdentifier().find_entities([text]))
