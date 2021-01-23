import {processUrl} from './functions';

export interface Language {
  short: string;
  name: string;
}

export class Word {
  string: string;
  language: string;
  translation: string;
  tfidfScore: number;

  constructor(str, tfidfScore= 0) {
    this.string = str;
    this.tfidfScore = tfidfScore;
  }

  setLanguage(language) {
    this.language = language;
  }

  setTranslation(translation) {
    this.translation = translation;
  }
}

export class SignIn {
  email: string;
  password: string;

  constructor(email = 'bares.jakub@gmail.com', password = 'ja8612ja86') {
    this.email = email;
    this.password = password;
  }
}

export class UserData {
  uid: string;
  motherLanguage: string;
  learnedLanguage: string;
  articles: Article[];

  constructor(mother, learned, articles) {
    this.motherLanguage = mother;
    this.learnedLanguage = learned;
    this.articles = articles;
  }
}

export class Sentence {
  tag: string;
  articleUrl: string;
  text: string;
  versions: any;
  order: number;
  className: string;
  styleCSS: string;
  comparedSentences: Sentence[] = [];

  constructor(tag, text, articleUrl) {
    this.articleUrl = articleUrl;
    this.versions = {};
    this.tag = tag;
    this.text = text;
  }

  setComparedSentences() {
    this.comparedSentences = [
      new Sentence("P", "aaa sfw csdsvwwsd", "http"),
      new Sentence("P", "iojsdva acsadjkncanocowqcds csdsd", "http")
    ];
  }


  setOther(order) {
    this.order = order;
  }

  setStyleCSS(css) {
    this.styleCSS = css;
  }
}

export class Article {
  url: string;
  title: string;
  titles: any;
  language: string;
  textClass: string;
  translated: boolean;

  constructor(url: string, title: string, textClass: string) {
    this.url = processUrl(url);
    this.title = title;
    this.titles = {};
    this.textClass = textClass;
    this.translated = false;
  }

  setLanguage(language: string) {
    this.titles[language] = this.title;
    this.language = language;
  }
}
