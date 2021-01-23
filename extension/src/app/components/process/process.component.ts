import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AppService} from '../../app.service';
import {ContentProcessor} from '../../../helper/content-processor';
import {Article} from '../../../helper/classes';
import {AuthService} from '../../auth.service';
import {TranslateService} from '../../translate.service';
import {APIService} from "../../api.service";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
  constructor(public service: AppService,
              private api: APIService,
              private auth: AuthService) {
    window['process'] = this;
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'start') {
        this.process(message, sendResponse);
        this.service.loading = false;
      } else if (message.type === 'url-change') {
        if (this.service.currentUrl !== message.url) {
          this.service.processed = false;
        }
        this.service.currentUrl = message.url;
      }
      return true;
    });
  }

  process(message, sendResponse) {
    const { innerHTML, url, pageTitle }  = message;
    const processor = new ContentProcessor(innerHTML, url, pageTitle);
    const { textClass, title } = processor;
    const articleToProcess = new Article(url, title, textClass);
    this.service.saveArticleIfNew(articleToProcess, processor.sentences);
    const article = { title, url };
    this.api.getAnalysis({title, sentences: processor.sentences}).subscribe((data: any) => {
      console.log("MESSAGE", data);
      const sentences = data.sentences.map(sent => {
        sent.setComparedSentences();
        return sent;
      });
      sendResponse({sentences, article, userId: 1  }); // this.auth.user.uid
    });
  }
}


