
import {Injectable} from '@angular/core';
import {AnalyzedSentence} from './helper/classes';
import {AngularFirestore} from "@angular/fire/firestore";
import {newSQLDate} from "./helper/functions";


@Injectable()
export class FireStoreService {
  get sentencesRef() {
    return this.db.firestore.collection(`sentences`);
  }

  get articlesRef() {
    return this.db.firestore.collection(`articles`);
  }

  constructor(
    private db: AngularFirestore
  ) {
  }

  addArticle(url, callback) {
    this.articleNotSaved(url, (notSaved) => {
      if (notSaved) {
        const id = this.db.createId();
        this.articlesRef.doc(id).set({ url, date: newSQLDate() }).then(success => {
          callback(success);
        });
      }
    });
  }

  addSentence(sentence: AnalyzedSentence, callback) {
    this.sentenceNotSaved(sentence.text, (notSaved) => {
      if (notSaved) {
        const id = this.db.createId();
        const { article_url, text } = sentence;
        this.sentencesRef.doc(id).set({ article_url, text, date: newSQLDate() }).then(success => {
          callback(success);
        });
      }
    });
  }

  sentenceNotSaved(sentence, callback) {
    this.sentencesRef.where('text', '==', sentence)
      .get().then((querySnapshot) => {
      callback(querySnapshot.empty);
    });
  }

  articleNotSaved(url, callback) {
    this.articlesRef.where('url', '==', url)
      .get().then((querySnapshot) => {
      callback(querySnapshot.empty);
    });
  }
}



