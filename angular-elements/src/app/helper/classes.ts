export class AnalyzedSentence {
  text: string;
  article_url: string;
  score = 90;
  mark = "A+";
  shown = true;
  comparedSentences: AnalyzedSentence[] = [new AnalyzedSentence("VOLE", "FHIUASDFHIUA FHQWFNIHUAVH UIAHCVACAWDOIUCAJSDO")];

  constructor(article_url, text) {
    this.article_url = article_url;
    this.text = text;
  }

  setComparedSentences(compared: AnalyzedSentence[]) {
    this.comparedSentences = compared;
  }
}

export class Article {
  url: string;
  title: string;

  constructor(url: string, title: string) {
    this.url = url;
    this.title = title;
  }
}
