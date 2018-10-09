import { Expression } from "./Expression";

export class Cell {

    public colSpan:number = 1;
    public rowSpan:number = 1;
    public expression:Expression = null;
    

    private formattedValue:string;
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
        this._value =newValue;
        this.formattedValue = newValue;//TODO:change that after adding formula 
    }

}