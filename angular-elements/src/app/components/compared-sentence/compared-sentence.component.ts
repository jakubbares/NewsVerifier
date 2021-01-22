import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AnalyzedSentence} from "../../helper/classes";

@Component({
  selector: 'app-compared-sentence',
  styleUrls: ['./compared-sentence.component.scss'],
  template: `
    <div class="block">
      <div class="header">
        <div class="domain">{{sentence.article_url}}</div>
        <div class="score">{{sentence.score}}</div>
      </div>
      <div class="text">{{sentence.text.substr(0, 40)}}</div>
    </div>
  `
})
export class ComparedSentenceComponent implements OnInit {
  @Input('sentence') sentence: AnalyzedSentence;
  constructor() {
    window['sent'] = this;
  }

  ngOnInit(): void {

  }
}


