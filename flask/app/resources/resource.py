from flask import Blueprint, request, jsonify, make_response
from flask_restful import Api, Resource
import json
from app.classes.ner_identifier import NERIdentifier
from app.classes.sentence_comparator import SentenceComparator

#ner_identifier = NERIdentifier()
comparator = SentenceComparator()
comparator.load_from_files()

class Analysis(Resource):
    @staticmethod
    def test_ner():
        pass
        #entities = ner_identifier.extract_entities(["Šéf komunistů Vojtěch Filip po schůzce s premiérem Andrejem Babišem řekl, že německá kancléřka Angela Merkel bude prosazovat, aby Evropská unie nakupovala vakcíny i mimo Unii, v Rusku a Číně. Babiš ale iDNES.cz řekl, že s německou kancléřkou mluvil o tom, že Evropa by měla usilovat o svoji vlastní vakcínu."])
        #print(entities)
        #return json.dumps(entities)

    @staticmethod
    def analyze():
        results = []
        raw_dict = request.get_json(force=True)
        for query_sentence in raw_dict["sentences"]:
            result = comparator.vector_search(query_sentence['text'], num_results=3)
            print(result)
            item = {"text": query_sentence["text"], "compared": result, "url": "" }
            results.append(item)
        return json.dumps({"sentences": results})


