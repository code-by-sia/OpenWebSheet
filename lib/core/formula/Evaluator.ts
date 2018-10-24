export interface IDateProvider {
    getEvaluatedValue(key):any;
}

export class Evaluator {
    private static valueRegex = /(([a-zA-Z]+[0-9])+\:?([a-zA-Z]+[0-9]+)?)/g;

    public static Eval(dataProvider:IDateProvider, str:string) {
        if(str.length < 1 || str[0] != '='){
            return str;
        }
        
        let m;
        let regex = this.valueRegex;
        let temp = str;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match, groupIndex) => {
                if (groupIndex == 0) {
                    temp = temp.replace(match,dataProvider.getEvaluatedValue(match))
                }
            });
        }

        return eval(temp.substr(1));

    }
}