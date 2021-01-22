import { Tokenizer } from './tokenizer';
import {Sentence, Word} from './classes';
import {distinct, extractWords, processUrl} from './functions';

export class ContentProcessor {
  innerHTML: string;
  textClass: string;
  tokenizer: Tokenizer;
  pageTitle: string;
  title: string;
  url: string;
  body: any;
  elements: HTMLElement[];
  sentences: Sentence[];

  constructor(innerHTML, url, pageTitle) {
    this.tokenizer = new Tokenizer();
    this.innerHTML = innerHTML;
    this.pageTitle = pageTitle;
    this.url = processUrl(url);
    this.body = this.prepareBody();
    this.elements = this.extractElements();
    this.createParagraphs();
  }

  extract(element: HTMLElement) {
    const entry = element.innerText.replace(/\t+/g, ' ').replace(/\s+/g, ' ').replace(/↵/g, '');
    return { entry, className: element.className };
  }

  handleMain(element) {
    const { entry, className } = this.extract(element);
    this.tokenizer.processEntry(entry);
    this.tokenizer.sentences.forEach((sentence: string) => {
      const paragraph = new Sentence(element.tagName, sentence, className, this.url );
      this.sentences.push(paragraph);
    });
  }

  handleOther(element) {
    const { entry, className } = this.extract(element);
    const paragraph = new Sentence(element.tagName, entry, className, this.url);
    this.sentences.push(paragraph);
  }

  processElement(element: HTMLElement) {
    if (element.tagName === 'P') {
      this.handleMain(element);
    } else if (element.tagName === 'SPAN') {
      return;
    } else {
      this.handleOther(element);
    }
  }

  createParagraphs() {
    this.sentences = [];
    this.elements.forEach(element => {
      this.processElement(element);
    });
    this.sentences = this.sentences.map((par, index) => {
      par.setOther(index + 1, false);
      return par;
    });
  }

  extractElements() {
    const { className, indexLongest, divs } = this.longestDiv();
    this.textClass = className;
    const before = this.divsBefore(divs, indexLongest);
    this.title = this.getTitle(before);
    this.elements = [...before, ...Array.from((divs[indexLongest] as HTMLElement)
      .querySelectorAll('p, span, h1, h2, h3, h4, h5, h6'))];
    return this.elements;
  }

  getTitle(before) {
    const title = before.find(s => {
      return s.tagName === 'H1';
    });
    return title !== undefined ? title.innerText : this.pageTitle;
  }

  divsBefore(divs, indexLongest) {
    const allDivsBefore = divs.filter((d, index) => {
      return index < indexLongest;
    });
    return [].concat(...allDivsBefore.map((d: HTMLElement) => {
      return Array.from(d.children).filter(c => {
        return ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(c.tagName);
      });
    }));
  }

  prepareBody() {
    const body = document.createElement( 'html' );
    body.innerHTML = this.innerHTML;
    return body;
  }

  longestDiv() {
    const divs = Array.from(this.body.getElementsByTagName('div'));
    const lens = divs.map((d: HTMLElement) => {
      return Array.from(d.children).filter(c => {
        return c.tagName === 'P';
      }).length;
    });
    const maxLen = Math.max(...lens);
    const indexLongest = lens.indexOf(maxLen);
    const className = (divs[indexLongest] as HTMLElement).className;
    return { className, indexLongest, divs };
  }


}




