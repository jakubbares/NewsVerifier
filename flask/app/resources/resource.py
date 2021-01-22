from flask_restful import Api, Resource
import json
from app.classes.ner_identifier import NERIdentifier
from app.classes.sentence_comparator import SentenceComparator

ner_identifier = NERIdentifier()
comparator = SentenceComparator()
#comparator.prepare()

class Analysis(Resource):
    @staticmethod
    def test_ner():
        entities = ner_identifier.find_entities(["Šéf komunistů Vojtěch Filip po schůzce s premiérem Andrejem Babišem řekl, že německá kancléřka Angela Merkel bude prosazovat, aby Evropská unie nakupovala vakcíny i mimo Unii, v Rusku a Číně. Babiš ale iDNES.cz řekl, že s německou kancléřkou mluvil o tom, že Evropa by měla usilovat o svoji vlastní vakcínu."])
        print(entities)
        return json.dumps("Vole")

    @staticmethod
    def analyze():
        return json.dumps("Vole")
