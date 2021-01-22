
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
