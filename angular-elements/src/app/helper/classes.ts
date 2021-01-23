import * as d3 from 'd3';

export const colorScale = d3.scaleLinear<string, number>()
  .domain([0, 100])
  .range(<ReadonlyArray<string>>["red", "green"]);

export class AnalyzedSentence {
  text: string;
  article_url: string;
  score = 90;
  domain: string;
  mark = "A+";
  shown = true;
  comparedSentences: AnalyzedSentence[] = [];

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
