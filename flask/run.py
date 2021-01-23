from app.classes.sentence_comparator import SentenceComparator
from app.classes.file_loader import FileLoader
from app.classes.ner_identifier import NERIdentifier

comp = SentenceComparator()
comp.process_df()


#comp.load_from_files()
#comp.test_vectors()




text = """Šéf komunistů Vojtěch Filip po schůzce s premiérem Andrejem Babišem řekl, že německá kancléřka 
Angela Merkel bude prosazovat, aby Evropská unie nakupovala vakcíny i mimo Unii, v Rusku a Číně. Babiš ale iDNES.cz řekl, 
že s německou kancléřkou mluvil o tom, že Evropa by měla usilovat o svoji vlastní vakcínu."""

#print(NERIdentifier().extract_entities([text]))
