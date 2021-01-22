import {Component, Input, ViewEncapsulation, OnInit, OnChanges, AfterViewInit} from '@angular/core';
import {AnalyzedSentence, Article} from './helper/classes';
import {FireStoreService} from "./firestore.service";
import {APIService} from "./api.service";

@Component({
  selector: 'app-content',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="fixed-wrapper">
      <div class="wrapper">
        <app-header [article]="article"></app-header>
        <div *ngFor="let sentence of sentences" class="sentences-container">
          <app-analyzed-sentence *ngIf="sentence.shown" [sentence]="sentence"></app-analyzed-sentence>
          <div *ngIf="!sentence.shown" class="dot"></div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnChanges {
  _sentences: AnalyzedSentence[];
  _uid: string;
  _article: Article;
  get sentences(): AnalyzedSentence[] {
    return this._sentences;
  }
  get article(): Article {
    return this._article;
  }
  get userId(): string {
    return this._uid;
  }
  @Input('article')
  set articleJSON(json: string) {
    console.log('Setter');
    this._article = JSON.parse(json);
  }
  @Input('sentences')
  set sentencesJSON(json: string) {
    console.log('Setter');
    this._sentences = JSON.parse(json);
  }
  @Input('uid')
  set uid(uid: string) {
    console.log('Setter uid');
    this._uid = uid;
  }

  constructor(
    private firestore: FireStoreService,
    private api: APIService
              ) {
    window['app'] = this;
    this.firestore.addArticle(window.location.href, (success) => {
      console.log('Article saved');
    });
    this.sentences.forEach(sentence => {
      this.firestore.addSentence(sentence, (success) => {
        console.log('Sentences saved');
      });
    });
    this.api.getAnalysis({title: this.article.title, sentences: this.sentences});
  }

  ngOnChanges() {

  }
}
