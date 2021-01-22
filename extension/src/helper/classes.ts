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
  language: string;
  translated: boolean;
  translation: string;
  className: string;
  styleCSS: string;

  constructor(tag, text, className, articleUrl) {
    this.articleUrl = articleUrl;
    this.className = className;
    this.versions = {};
    this.tag = tag;
    this.text = text;
    this.translation = '';
  }

  setOther(order, translated= false) {
    this.order = order;
    this.translated = translated;
  }

  setLanguage(language) {
    this.language = language;
    this.versions[language] = this.text;
  }

  setTranslation(language, translation) {
    this.translation = translation;
    this.versions[language] = translation;
  }

  setStyleCSS(css) {
    this.styleCSS = css;
  }

  reverseLanguage(detectedLanguage, targetLanguage, translation) {
    const text = this.text;
    this.translated = true;
    this.text = translation;
    this.translation = text;
    this.language = targetLanguage;
    this.versions[targetLanguage] = translation;
    this.versions[detectedLanguage] = text;
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

  setTranslation(translatedTitle: string, targetLanguage: string) {
    this.titles[targetLanguage] = translatedTitle;
  }

  reverseLanguage(translatedTitle: string, targetLanguage: string) {
    this.translated = true;
    this.language = targetLanguage;
    this.title = translatedTitle;
    this.setTranslation(translatedTitle, targetLanguage);
  }
}

export interface ReadenceAPITranslation {
  translations: string[];
}

export interface TranslationResponseBody {
  data: TranslationResponseList;
}

export interface DetectResponseBody {
  data: DetectLanguageResponseList;
}

export interface TranslationResponseList {
  translations: TranslatedText[];
}

export interface TranslatedText {
  translatedText: string;
}


export interface DetectLanguageResponseList {
  detections: Detection[];
}

interface Detection {
  language: string;
  confidence: number;
}
