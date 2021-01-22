import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AnalyzedSentence} from "../../helper/classes";

@Component({
  selector: 'app-analyzed-sentence',
  styleUrls: ['./analyzed-sentence.component.scss'],
  template: `
    <div class="block">
      <div>{{sentence.text}}</div>
      <app-compared-sentence *ngFor="let compared of sentence.comparedSentences" [sentence]="compared"></app-compared-sentence>
    </div>
  `
})
export class AnalyzedSentenceComponent implements OnInit {
  @Input() sentence: AnalyzedSentence;
  constructor() {
    window['sent'] = this;
  }

  ngOnInit(): void {

  }
}


