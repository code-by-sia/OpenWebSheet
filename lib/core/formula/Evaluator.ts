export interface IDateProvider {
    getEvaluatedValue(key): any;
}


class Env {
    constructor(private ranges, private dataProvider) {
    }

    private data(selector) {
        return this.dataProvider.getEvaluatedValue(selector);
    }

    public Eval(txt) {
        let _M_E_ = this;
        let _R_A_N_G_E_ = this.ranges;

        const PI = Math.PI;
        const E = Math.E;
        function SUM(selector) {
            return _M_E_.data(selector).reduce((x, y) => x * 1 + y * 1, 0);
        }

        function MIN(selector) {
            return _M_E_.data(selector).reduce((x, y) => Math.min(x * 1, y * 1), 0);
        }

        function MAX(selector) {
            return _M_E_.data(selector).reduce((x, y) => Math.max(x * 1, y * 1), 0);
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
    }
}

export class Evaluator {


    private static valueRegex = /(([a-zA-Z]+[0-9])+\:?([a-zA-Z]+[0-9]+)?)/g;

    public static Eval(dataProvider: IDateProvider, str: string) {
        if (str.length < 1 || str[0] != '=') {
            return str;
        }

        let m;
        let regex = new RegExp(this.valueRegex);
        let temp = str;

        let ranges = [];
        let range_index = 0;
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match, groupIndex) => {
                if (match && match.indexOf(':') != -1) {
                    ranges.push(match);
                    temp = temp.replace(match + '', `_R_A_N_G_E_[${range_index++}]`);
                } else if (groupIndex == 0) {
                    let ev = dataProvider.getEvaluatedValue(match);
                    temp = temp.replace(match, ev);
                }
            });
        }

        try {
            return new Env(ranges, dataProvider).Eval(temp.substr(1));
        } catch (err) {
            return '#ERR';
        }

    }


}