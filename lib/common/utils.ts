export function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function isComma(ch) {
    return (ch === ",");
}

export function isDigit(ch) {
    return /\d/.test(ch);
}

export function isLetter(ch) {
    return /[a-z]/i.test(ch);
}

export function isOperator(ch) {
    return /\+|-|\*|\/|\^/.test(ch);
}

export function isLeftParenthesis(ch) {
    return (ch === "(");
}

export function isRightParenthesis(ch) {
    return (ch == ")");
}