from transformers import AutoTokenizer, AutoModel
import torch
import json

class SentenceEmbedder:
    def __init__(self, path="DeepPavlov/bert-base-bg-cs-pl-ru-cased"):
        self.tokenizer = AutoTokenizer.from_pretrained(path)
        self.model = AutoModel.from_pretrained(path)

    def tokenize(self, sentence, max_length=512):
        return self.tokenizer.encode(sentence, max_length=max_length, truncation=True)

    def tokenize_batch(self, sentences, max_length=512):
        tokens = self.tokenizer.batch_encode_plus(sentences, padding=True, max_length=max_length, truncation=True)
        return tokens['input_ids']

    def encode(self, sentence, pooled=False, max_length=512):
        if not isinstance(sentence, str):
            return [0 for i in range(768)]
        input_ids = torch.tensor(self.tokenize(sentence, max_length=max_length)).unsqueeze(0)
        out = self.model(input_ids)
        if pooled:
          return out[1].squeeze().detach().numpy()
        else:
          return out[1].mean(0).squeeze().detach().numpy()

    def encode_many(self, sentences, pooled=False, max_length=512):
        input_ids = torch.tensor(self.tokenize_batch(sentences, max_length=max_length))
        out = self.model(input_ids)
        if pooled:
          return out['pooler_output'].detach().numpy()
        else:
          return out['last_hidden_state'].mean(1).detach().numpy()
