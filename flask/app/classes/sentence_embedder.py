from transformers import AutoTokenizer, AutoModel
import torch

class SentenceEmbedder:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("DeepPavlov/bert-base-bg-cs-pl-ru-cased")
        self.model = AutoModel.from_pretrained("DeepPavlov/bert-base-bg-cs-pl-ru-cased")

    def tokenize(self, sentence):
        return self.tokenizer.encode(sentence)

    def tokenize_batch(self, sentences, max_length=None):
        tokens = self.tokenizer.batch_encode_plus(sentences, padding=True, max_length=max_length)
        return tokens['input_ids']

    def encode(self, sentence, pooled=False):
        input_ids = torch.tensor(self.tokenize(sentence)).unsqueeze(0)
        tensors_tuple = self.model(input_ids)
        print(tensors_tuple)
        if pooled:
            return tensors_tuple[1].squeeze().detach().numpy()
        else:
            return tensors_tuple[0].mean(1).squeeze().detach().numpy()

    def encode_many(self, sentences, pooled=False, max_length=None):
        input_ids = torch.tensor(self.tokenize_batch(sentences, max_length=max_length))
        out = self.model(input_ids)
        if pooled:
            return out['pooler_output'].squeeze().detach().numpy()
        else:
            return out['last_hidden_state'].mean(1).squeeze().detach().numpy()
