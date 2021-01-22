from deeppavlov.core.common.file import read_json
from deeppavlov import configs, build_model
bert_config = read_json(configs.embedder.bert_embedder)
bert_config['metadata']['variables']['BERT_PATH'] = 'saved_files/slavic_bert'




class SentenceEmbedder:
    def __init__(self):
        self.model = build_model(bert_config)

    def encode(self, sentence):
        return self.model([sentence])





