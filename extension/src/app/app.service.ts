import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article, Sentence, Word} from '../helper/classes';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {TranslateService} from './translate.service';
import {ContentProcessor} from '../helper/content-processor';
import {AuthService} from './auth.service';
import {Tokenizer} from '../helper/tokenizer';
import {dateToSQL, extractWords, getRandomColor, newSQLDate, replaceSymbols} from '../helper/functions';

@Injectable()
export class AppService {
  private baseUrl = `${environment.apiUrl}`;
  private collection: AngularFirestoreCollection<Article>;
  currentUrl: string;
  loading = false;
  articles: Observable<any[]>;
  users: Observable<any[]>;
  processed = false;
  innerHTML: string;
  processor: ContentProcessor;
  constructor(private http: HttpClient,
              private auth: AuthService,
              private translate: TranslateService,
              private db: AngularFirestore) {
    this.collection = this.db.collection<Article>('articles');
    this.articles = this.db.collection('articles', ref => ref.where('id', 'in', ['fsdfsi87dsa78'])).valueChanges();
    this.users = this.db.collection('users').valueChanges();
  }

  public execute(update= false) {
    this.loading = true;
    console.log('Executed', this.processed);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (!this.processed) {
        chrome.tabs.executeScript({file: 'content.js'});
        console.log("Content script executed");
        this.processed = true;
      }
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.body.style.backgroundColor = "' + getRandomColor() + '";' }
      );
    });
  }

  saveArticleIfNew(article: Article, paragraphs: Sentence[]) {
    this.db.collection('articles', ref => ref.where('url', '==', article.url )).get()
      .subscribe((docSnapshot) => {
        if (docSnapshot.empty) {
          /*this.addArticle(article, paragraphs, _ => {
            console.log('Article added');
          });*/
        }
      });
  }

  addArticle(item: Article, paragraphs: Sentence[], callback) {
    const id = this.db.createId();
    console.log({articleId: id});
    const { url, titles, title, language, textClass, translated } = item;
    this.collection.doc(id).set({ id,  url, titles, title, language, textClass, translated, date: newSQLDate() });
    const articleRef = this.collection.doc(id);
    const batch = this.db.firestore.batch();
    paragraphs.forEach((paragraph: Sentence) => {
      const parId = this.db.createId();
      const paragraphRef = this.db.firestore.doc(`articles/${id}/paragraphs/${parId}`);
      const { versions, order, tag } = paragraph;
      batch.set(paragraphRef, { id: parId,  text: versions, order, tag, language, translated, date: newSQLDate() } );
    });
    batch.commit().then(() => {
      callback(true);
    });
  }

}
