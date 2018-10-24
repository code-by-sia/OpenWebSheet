define(["require", "exports"], function (require, exports) {
    var Evaluator = (function () {
        function Evaluator() {
        }
        Evaluator.Eval = function (dataProvider, str) {
            if (str.length < 1 || str[0] != '=') {
                return str;
            }
            var m;
            var regex = this.valueRegex;
            var temp = str;
            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                m.forEach(function (match, groupIndex) {
                    if (groupIndex == 0) {
                        temp = temp.replace(match, dataProvider.getEvaluatedValue(match));
                    }
                });
            }
            return eval(temp.substr(1));
        };
        Evaluator.valueRegex = /(([a-zA-Z]+[0-9])+\:?([a-zA-Z]+[0-9]+)?)/g;
        return Evaluator;
    })();
    exports.Evaluator = Evaluator;
});
