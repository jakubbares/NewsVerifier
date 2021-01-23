from transformers import AutoTokenizer, AutoModel
import torch

class SentenceEmbedder:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("DeepPavlov/bert-base-bg-cs-pl-ru-cased")
        self.model = AutoModel.from_pretrained("DeepPavlov/bert-base-bg-cs-pl-ru-cased")

    def tokenize(self, sentence):
        return self.tokenizer.encode(sentence)

    def encode(self, text):
        input_ids = torch.tensor(self.tokenize(text)).unsqueeze(0)
        out = self.model(input_ids)
        hidden = out['last_hidden_state']
        return hidden.mean(1)
