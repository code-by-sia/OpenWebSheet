export interface IDateProvider {
  getEvaluatedValue(key: string): any;
}


class Env {
  constructor(private ranges: any, private dataProvider: any) {
  }

  private data(selector: any) {
    return this.dataProvider.getEvaluatedValue(selector);
  }

  public Eval(txt: string) {
    let _M_E_ = this;
    let _R_A_N_G_E_ = this.ranges;

    const PI = Math.PI;
    const E = Math.E;

    function SUM(selector: any) {
      return _M_E_.data(selector).reduce((x: number, y: number) => x * 1 + y * 1, 0);
    }

    function MIN(selector: any) {
      return _M_E_.data(selector).reduce((x: number, y: number) => Math.min(x * 1, y * 1), 0);
    }

    function MAX(selector: any) {
      return _M_E_.data(selector).reduce((x: number, y: number) => Math.max(x * 1, y * 1), 0);
    }

    function SIN(v: number) {
      return Math.sin(v);
    }

    function COS(v: number) {
      return Math.cos(v);
    }

    function TAN(v: number) {
      return Math.tan(v);
    }

    function ASIN(v: number) {
      return Math.asin(v);
    }

    function ACOS(v: number) {
      return Math.acos(v);
    }

    function ATAN(v: number) {
      return Math.atan(v);
    }

    function ASINH(v: number) {
      return Math['asinh'](v);
    }

    function ACOSH(v: number) {
      return Math['acosh'](v);
    }

    function ATANH(v: number) {
      return Math['atanh'](v);
    }

    function ABS(v: number) {
      return Math.abs(v);
    }

    function SQRT(v: number) {
      return Math.sqrt(v);
    }

    function CBRT(v: number) {
      return Math['cbrt'](v);
    }

    function LOG(v: number) {
      return Math.log(v);
    }

    function EXP(v: number) {
      return Math.exp(v);
    }

    function TRUNC(v: number) {
      return Math['trunc'](v);
    }

    function CEIL(v: number) {
      return Math.ceil(v);
    }

    function FLOOR(v: number) {
      return Math.floor(v);
    }


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
    let regex = this.valueRegex;
    let temp = str;

    let ranges: any[] = [];
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
