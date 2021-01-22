import {distinct, keepLetters} from './functions';

export class Tokenizer {
  paragraph: string;
  sentences: string[];
  intermediate: Intermediate;
  interpunction: Interpunction;
  divider: RegExp;
  letters: RegExp;

  constructor() {
    this.intermediate = new Intermediate();
  }

  processEntry(text: string) {
    this.divider = /([\.\?\!]{1}|([\.\?\!]{1}\"))[\s]{1}/;
    this.letters = /[^\.\?\!\s]+/;
    this.paragraph = text;
    this.sentences = this.split(text);
  }

  private split(text: string): string[] {
    this.interpunction = new Interpunction(text);
    this.intermediate.reset();
    this.sentences = text.split(this.divider)
      .filter(item => item && keepLetters(item) && keepLetters(item).length >= 2)
      .reduce((result: string[], item: string, index: number, array: string[]) => {
      const interpunction = this.interpunction.query(item);
      const sentence = item + interpunction;
      const finish = () => {
        const joined = this.intermediate.array.join(' ');
        if (joined.length) {
          result.push(joined);
        }
        this.intermediate.reset();
        const match = sentence.match(this.letters);
        if (match) {
          result.push(sentence);
        }
      };
      if (index === array.length - 1) {
        finish();
      } else if (item.length < 10 && this.intermediate.length < 30 ) {
        this.intermediate.push(sentence);
      } else if (item.length < 7) {
        this.intermediate.push(sentence);
      } else {
        finish();
      }
      return result;
    }, []);
    return this.sentences;
  }
}

class Intermediate {
  array: string[];
  length: number;

  constructor() {
    this.reset();
  }

  reset() {
    this.array = [];
    this.length = 0;
  }

  push(sentence: string) {
    this.array.push(sentence);
    this.length += sentence.length;
  }
}

class Interpunction {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  query(item: string) {
    const splitted = this.text.split(item);
    const next = splitted.length ? splitted[1] : null;
    return next ? next[0] : '';
  }
}
