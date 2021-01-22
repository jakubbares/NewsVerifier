from deeppavlov import configs, build_model
#ner_model =



class NERIdentifier:
    def __init__(self):
        #self.model = build_model("./config_slavic_bert.json", download=True)
        self.model = build_model(configs.ner.ner_ontonotes_bert_mult, download=True)

    def find_entities(self, sentences):
        result = self.model(sentences)
        return result

