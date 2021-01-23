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
from app.classes.ner_identifier import NERIdentifier
from app.classes.sentence_embedder import SentenceEmbedder
from app.classes.helper import flatten

class SentenceComparator:
    def __init__(self):
        self.file_name_suffix = "suffix"
        self.logger = Logger("comparator").logger
        self.db = Database()
        self.file_loader = FileLoader()
        self.embedder = SentenceEmbedder()
        #self.ner = NERIdentifier()
        self.saved_files_folder_name = "saved_files"
        self.loaded_files_folder_name = "saved_files"

    def prepare(self):
        self.load_articles()
        self.load_sentences()
        self.create_sentences_df()
        self.save_to_files()
        #self.create_entities()
        self.init_sentence_index()
        self.add_sentence_vectors_from_df()
        self.add_sentence_vectors(self.sentences)
        self.save_to_files()


    def test(self):
        self.load_from_files()
        print(self.vector_search("Základní školy dostanou vyjímku od vakcíny", 3))

    def load_articles(self):
        self.articles = self.file_loader.load_from_json()

    def load_sentences(self):
        self.sentences = flatten([article.sentences for article in self.articles])
        self.logger.info(f"Loaded {len(self.sentences)} sentences for {len(self.articles)} articles")

    def create_sentences_df(self):
        self.logger.info("Creating sentences dataframe")
        rows = [{"id": sentence.id, "text": sentence.text,
                 "article_url": sentence.article_url, "article_id": sentence.article_id} for sentence in self.sentences]
        sentences_df = pd.DataFrame(rows)
        sentences_df.to_csv(os.path.join(self.saved_files_folder_name, f"sentences_df.{self.file_name_suffix}"))
        print(sentences_df)
        self.sentences_df = sentences_df.reset_index(drop=True)
        self.sentences_df["index"] = self.sentences_df.index

    def create_entities(self):
        self.sentences_df["entities"] = self.sentences_df["text"].apply(self.ner.extract_entities)

    def create_embeddings(self):
        self.sentences_df["embedding"] = self.sentences_df["text"].apply(self.embedder.encode)

    def create_entity_inverted_index(self):
        self.entity_index = {}
        for _ind, row in self.sentences_df.iterrows():
            for entity in row["entities"]:
                if entity in self.entity_index:
                    self.entity_index[entity].append(row["index"])
                else:
                    self.entity_index[entity] = []
                    self.entity_index[entity].append(row["index"])

    def init_sentence_index(self):
        self.logger.info("Initializing sentence index")
        empty_embedding = np.array([self.embedder.encode("Vole")]).astype("float32")
        print(empty_embedding.shape[1])
        self.sentences_list = []
        self.sentence_index = faiss.IndexFlatL2(empty_embedding.shape[1])
        self.sentence_index = faiss.IndexIDMap(self.sentence_index)

    def vector_search(self, search_query: str, num_results: int):
        embedding = self.embedder.encode(search_query).astype("float32")
        other = np.array(embedding)
        other = other[None]
        D, I = self.sentence_index.search(other, k=num_results)
        result = [self.sentences_df.loc[self.sentences_df["index"] == i, "text"] for i in I.tolist()[0]]
        return result

    def add_sentence_vectors(self, sentences):
        for sentence in sentences:
            self.add_sentence_vector_to_index(sentence.text)

    def add_sentence_vectors_from_df(self, sentence):
        for _ind, row in self.sentences_df.iterrows():
            self.sentences_list.append(row["text"])
            self.sentence_index.add_with_ids(row["embedding"], np.array([_ind]))

    def add_sentence_vector_to_index(self, sentence):
        index = len(self.sentences_list) - 1
        vector = self.vectorize(sentence)
        self.sentences_list.append(sentence)
        self.sentence_index.add_with_ids(vector, np.array([index]))

    def vectorize(self, text):
        return np.array([self.embedder.encode(text)]).astype("float32")

    def save_to_files(self):
        self.logger.info("Saving to files")
        self.sentences_df.to_csv(os.path.join(self.saved_files_folder_name, f"sentences_df.{self.file_name_suffix}"))
        faiss.write_index(self.sentence_index, os.path.join(self.saved_files_folder_name, f"sentences_index.{self.file_name_suffix}"))
        with open(os.path.join(self.saved_files_folder_name, f"unique_sentences_list.{self.file_name_suffix}"), "w") as fp:
            json.dump(self.sentences_list, fp)

    def load_from_files(self):
        self.sentences_df = pd.read_csv(os.path.join(self.loaded_files_folder_name, f"sentences_df.{self.file_name_suffix}"))
        self.sentence_index = faiss.read_index(os.path.join(self.loaded_files_folder_name, f"sentences_index.{self.file_name_suffix}"))
        with open(os.path.join(self.loaded_files_folder_name, f"unique_sentences_list.{self.file_name_suffix}"), "r") as fp:
            self.sentences_list = json.load(fp)



