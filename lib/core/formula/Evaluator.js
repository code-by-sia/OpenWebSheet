define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Env = /** @class */ (function () {
        function Env(ranges, dataProvider) {
            this.ranges = ranges;
            this.dataProvider = dataProvider;
        }
        Env.prototype.data = function (selector) {
            return this.dataProvider.getEvaluatedValue(selector);
        };
        Env.prototype.Eval = function (txt) {
            var _M_E_ = this;
            var _R_A_N_G_E_ = this.ranges;
            var PI = Math.PI;
            var E = Math.E;
            function SUM(selector) {
                return _M_E_.data(selector).reduce(function (x, y) { return x * 1 + y * 1; }, 0);
            }
            function MIN(selector) {
                return _M_E_.data(selector).reduce(function (x, y) { return Math.min(x * 1, y * 1); }, 0);
            }
            function MAX(selector) {
                return _M_E_.data(selector).reduce(function (x, y) { return Math.max(x * 1, y * 1); }, 0);
            }
            function SIN(v) { return Math.sin(v); }
            function COS(v) { return Math.cos(v); }
            function TAN(v) { return Math.tan(v); }
            function ASIN(v) { return Math.asin(v); }
            function ACOS(v) { return Math.acos(v); }
            function ATAN(v) { return Math.atan(v); }
            function ASINH(v) { return Math['asinh'](v); }
            function ACOSH(v) { return Math['acosh'](v); }
            function ATANH(v) { return Math['atanh'](v); }
            function ABS(v) { return Math.abs(v); }
            function SQRT(v) { return Math.sqrt(v); }
            function CBRT(v) { return Math['cbrt'](v); }
            function LOG(v) { return Math.log(v); }
            function EXP(v) { return Math.exp(v); }
            function TRUNC(v) { return Math['trunc'](v); }
            function CEIL(v) { return Math.ceil(v); }
            function FLOOR(v) { return Math.floor(v); }
            return eval(txt);
        };
        return Env;
    }());
    var Evaluator = /** @class */ (function () {
        function Evaluator() {
        }
        Evaluator.Eval = function (dataProvider, str) {
            if (str.length < 1 || str[0] != '=') {
                return str;
            }
            var m;
            var regex = new RegExp(this.valueRegex);
            var temp = str;
            var ranges = [];
            var range_index = 0;
            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                m.forEach(function (match, groupIndex) {
                    if (match && match.indexOf(':') != -1) {
                        ranges.push(match);
                        temp = temp.replace(match + '', "_R_A_N_G_E_[" + range_index++ + "]");
                    }
                    else if (groupIndex == 0) {
                        var ev = dataProvider.getEvaluatedValue(match);
                        temp = temp.replace(match, ev);
                    }
                });
            }
            try {
                return new Env(ranges, dataProvider).Eval(temp.substr(1));
            }
            catch (err) {
                return '#ERR';
            }
        };
        Evaluator.valueRegex = /(([a-zA-Z]+[0-9])+\:?([a-zA-Z]+[0-9]+)?)/g;
        return Evaluator;
    }());
    exports.Evaluator = Evaluator;
});
