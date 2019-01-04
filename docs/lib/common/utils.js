define(["require", "exports"], function (require, exports) {
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    exports.clone = clone;
    function isComma(ch) {
        return (ch === ",");
    }
    exports.isComma = isComma;
    function isDigit(ch) {
        return /\d/.test(ch);
    }
    exports.isDigit = isDigit;
    function isLetter(ch) {
        return /[a-z]/i.test(ch);
    }
    exports.isLetter = isLetter;
    function isOperator(ch) {
        return /\+|-|\*|\/|\^/.test(ch);
    }
    exports.isOperator = isOperator;
    function isLeftParenthesis(ch) {
        return (ch === "(");
    }
    exports.isLeftParenthesis = isLeftParenthesis;
    function isRightParenthesis(ch) {
        return (ch == ")");
    }
    exports.isRightParenthesis = isRightParenthesis;
});
