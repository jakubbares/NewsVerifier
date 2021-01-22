import os
import sys
import pandas as pd
import torch
from sentence_transformers import SentenceTransformer
from deeppavlov.models.embedders.transformers_embedder import TransformersBertEmbedder
import faiss
import numpy as np
import json
from app.classes.database import Database
from app.classes.logger import Logger
from app.classes.file_loader import FileLoader
from app.classes.sentence_embedder import SentenceEmbedder

class SentenceComparator:
    def __init__(self):
        self.logger = Logger("comparator").logger
        self.db = Database()
        self.file_loader = FileLoader()
        self.embedder = SentenceEmbedder()
        self.saved_files_folder_name = "saved_files"

    def run(self):
        self.load_articles()
        self.load_sentences()
        self.create_sentences_df()
        self.create_embeddings()
        self.init_sentence_index()
        self.add_sentence_vectors(self.sentences)

    def test(self):
        for _ind, row in self.sentences_df.iterrows():
            print(_ind, row["index"], row["text"])
        print(self.vector_search("Základní školy dostanou vyjímku od vakcíny", 3))

    def load_articles(self):
        article = self.file_loader.load_article()
        self.articles  = [article]

    def load_sentences(self):
        self.sentences = [sentence for article in self.articles for sentence in article.sentences]
        self.logger.info(f"Loaded {len(self.sentences)} sentences for {len(self.articles)} articles")

    def create_sentences_df(self):
        self.logger.info("Creating sentences dataframe")
        rows = [{"id": sentence.id, "text": sentence.text,
                 "article_url": sentence.article_url, "article_id": sentence.article_id} for sentence in self.sentences]
        sentences_df = pd.DataFrame(rows)
        self.sentences_df = sentences_df.reset_index(drop = True)
        self.sentences_df["index"] = self.sentences_df.index

    def create_embeddings(self):
        self.embeddings_file = os.path.join(self.saved_files_folder_name, f"embeddings.sentences.npy")
        self.logger.info("Creating embeddings")
        self.embeddings = self.embedder.encode_many(self.sentences_df.text.to_list())
        """
        try:
            self.embeddings = np.load(self.embeddings_file)
            self.logger.info("Loaded embeddings from file")
        except:
            self.logger.info("Creating embeddings")
            self.embeddings = self.embedder.encode_many(self.sentences_df.text.to_list())
            np.save(self.embeddings_file, self.embeddings)
        """
        self.logger.debug(f"Embeddings shape is {self.embeddings.shape}")

    def init_sentence_index(self):
        self.logger.info("Initializing tags index")
        empty_embedding = np.array([self.embedder.encode("")]).astype("float32")
        self.sentences_list = []
        self.sentence_index = faiss.IndexFlatL2(empty_embedding.shape[1])
        self.sentence_index = faiss.IndexIDMap(self.sentence_index)
        self.sentence_index.add_with_ids(empty_embedding, np.array([len(self.sentences_list) - 1]))

    def vector_search(self, search_query: str, num_results: int):
        embedding = self.embedder.encode(search_query).astype("float32")
        D, I = self.sentence_index.search(np.array(embedding), k=num_results)
        result = [self.sentences_df.loc[self.sentences_df["index"] == i, "text"] for i in I.tolist()[0]]
        return result

    def add_sentence_vectors(self, sentences):
        for sentence in sentences:
            self.add_sentence_vector_to_index(sentence.text)

    def add_sentence_vector_to_index(self, sentence):
        index = len(self.sentences_list) - 1
        vector = self.vectorize(sentence)
        self.sentences_list.append(sentence)
        self.sentence_index.add_with_ids(vector, np.array([index]))

    def vectorize(self, text):
        return np.array([self.embedder.encode(text)]).astype("float32")


