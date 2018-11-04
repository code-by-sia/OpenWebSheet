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

    // merged cell has following value
    public reference:Cell = null;

    public get isMerged() {
        return this.reference !== null;
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

    public get top() {
        if(this.isMerged) {
            return this.reference.top
        }

        return this.rowId;
    }

    public get left() {
        if(this.isMerged) {
            return this.reference.left
        }

        return this.columnId
    }

    public get bottom() {
        if(this.isMerged) {
            return this.reference.bottom
        }

        return this.rowId + this.rowSpan
    }

    public get right() {
        if(this.isMerged) {
            return this.reference.right
        }

        return this.columnId + this.colSpan
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