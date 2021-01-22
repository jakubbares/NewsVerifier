import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Article} from "../../helper/classes";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="header">Analýza článku "{{article.title}}"</div>
  `
})
export class HeaderComponent implements OnInit {
  @Input() article: Article;
  constructor() {
    window['sent'] = this;
  }

  ngOnInit(): void {

  }
}


