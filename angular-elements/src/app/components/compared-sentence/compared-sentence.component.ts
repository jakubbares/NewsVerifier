import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AnalyzedSentence} from "../../helper/classes";
import {colorScore} from "../../helper/functions";

@Component({
  selector: 'app-compared-sentence',
  styleUrls: ['./compared-sentence.component.scss'],
  template: `
    <div class="block">
      <div class="header">
        <div class="domain">{{sentence.domain}}</div>
        <div class="mark" [style.background]="colorScore(sentence.score)">{{sentence.mark}}</div>
      </div>
      <div class="text">{{sentence.text}}</div>
    </div>
  `
})
export class ComparedSentenceComponent implements OnInit {
  @Input('sentence') sentence: AnalyzedSentence;
  colorScore = colorScore;
  constructor() {
    window['sent'] = this;
  }

  ngOnInit(): void {

  }
}


