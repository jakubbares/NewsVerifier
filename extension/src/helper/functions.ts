import {Word} from './classes';

export function capitalizeField(field) {
  return field[0].toUpperCase() + field.slice(1).replace(/_/g, ' ');
}

export function setMissing(setted, setter) {
  if (!setted) {  setted = {}; }
  Object.keys(setter).forEach(key => {
    if (!setted.hasOwnProperty(key)) {
      setted[key] = setter[key];
    }
  });
  return setted;
}

export function distinct(value, index, self) {
  return self.indexOf(value) === index;
}


export function processUrl(url) {
  return url.split('/').filter(segment => !segment.startsWith('#')).reduce((str, segment) => {
    str += segment + '/';
    return str;
  }, '');
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function extractWords(sentences: string[]) {
  return [].concat(...sentences.map(s => s.split(' ')
    .map(w => keepLetters(w))
    .filter(w => w && w.length >= 1 && isNaN(w))
    .filter(distinct)
    .map(w => new Word(w))));
}

export function keepLetters(text) {
  return text.replace(/[\(\)\[\]\"\'\`\.\,\:\;\?\!\/\\]/, '');
}

function add0IfNecessary(num) {
  const str = num.toString();
  return str.length < 2 ? '0' + str : str;
}

export function dateToSQL(date: Date) {
  const month = add0IfNecessary(date.getMonth()+1);
  const day = add0IfNecessary(date.getDate());
  return `${date.getFullYear()}-${month}-${day}`;
}

export function newSQLDate() {
  return dateToSQL(new Date());
}

export function replaceSymbols(text: string) {
  return text.replace(/&quot;/g, '"');
}

