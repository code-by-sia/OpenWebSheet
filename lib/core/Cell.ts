export class Cell {
    public colSpan:number = 1;
    public rowSpan:number = 1;    

    private formattedValue:string;
    private evaluatedValue;
    private _columnId:number;
    private _rowId:number;
    private _value:any = null;

    public constructor(columnId:number, rowId:number) {
        this._columnId= columnId;
        this._rowId = rowId;
    }

    public get columnId() {
        return this._columnId;
    }

    public get rowId() {
        return this._rowId;
    }

    public get label() {
        return this.formattedValue;
    }

    public get value() {
        return this._value;
    }

    public set value(newValue) {
        this.update(newValue, newValue);
    }

    public update(newValue, evaluated):void {
        this._value = newValue;
        this.evaluatedValue = evaluated;
        this.format();
    }

    private format(){
        this.formattedValue = this.evaluatedValue;
    }

}