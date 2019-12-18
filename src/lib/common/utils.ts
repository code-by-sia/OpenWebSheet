export function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function isComma(ch: string) {
  return (ch === ',');
}

export function isDigit(ch: string) {
  return /\d/.test(ch);
}

export function isLetter(ch: string) {
  return /[a-z]/i.test(ch);
}

export function isOperator(ch: string) {
  return /\+|-|\*|\/|\^/.test(ch);
}

export function isLeftParenthesis(ch: string) {
  return (ch === '(');
}

export function isRightParenthesis(ch: string) {
  return (ch == ')');
}
