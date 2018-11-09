define(["require", "exports"], function (require, exports) {
    var Evaluator = (function () {
        function Evaluator() {
        }
        Evaluator.Eval = function (dataProvider, str) {
            if (str.length < 1 || str[0] != '=') {
                return str;
            }
            var m;
            var regex = new RegExp(this.valueRegex);
            var temp = str;
            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                m.forEach(function (match, groupIndex) {
                    if (groupIndex == 0) {
                        var ev = dataProvider.getEvaluatedValue(match);
                        temp = temp.replace(match, ev);
                    }
                });
            }
            try {
                return eval(temp.substr(1));
            }
            catch (err) {
                return '#ERR';
            }
        };
        Evaluator.valueRegex = /(([a-zA-Z]+[0-9])+\:?([a-zA-Z]+[0-9]+)?)/g;
        return Evaluator;
    })();
    exports.Evaluator = Evaluator;
});
