from deeppavlov import configs, build_model

class NERIdentifier:
    def __init__(self):
        self.model = build_model(configs.ner.ner_ontonotes_bert_mult, download=True)

    @property
    def useful_entities(self):
        return ["PERSON", "ORG"]

    def extract_entities(self, sentence):
        result = self.model(sentence)
        words = result[0][0]
        entities = result[1][0]
        return [word for word, entity in zip(words, entities) if self.shorten(entity) in self.useful_entities]

    def join_entities(self):
        pass

    def shorten(self, entity):
        try:
            prefix, suffix = entity.split("-")
            return suffix
        except:
            return entity

