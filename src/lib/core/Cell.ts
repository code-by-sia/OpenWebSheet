export class Cell {

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

  public get top(): number {
    if (this.isMerged && this.reference) {
      return this.reference.top;
    }

    return this.rowId;
  }

  public get left(): number {
    if (this.isMerged && this.reference) {
      return this.reference.left;
    }

    return this.columnId;
  }

  public get bottom(): number {
    if (this.isMerged && this.reference) {
      return this.reference.bottom;
    }

    return this.rowId + this.rowSpan;
  }

  public get right(): number {
    if (this.isMerged && this.reference) {
      return this.reference.right;
    }

    return this.columnId + this.colSpan;
  }

  public static from(data: any): Cell {
    const cell = new Cell(data.columnId, data.rowId);
    cell.colSpan = data.colSpan;
    cell.rowSpan = data.rowSpan;
    cell.formattedValue = data.formattedValue;
    cell.evaluatedValue = data.evaluatedValue;
    cell._columnId = data._columnId;
    cell._rowId = data._rowId;
    cell._value = data._value;
    cell.reference = data.reference && this.from(data.reference);
    return cell;
  }
  public colSpan: number = 1;
  public rowSpan: number = 1;

  // merged cell has following value
  public reference: Cell | null = null;

  private formattedValue?: string;
  private evaluatedValue?: string;
  private _columnId: number;
  private _rowId: number;
  private _value: any = null;

  public constructor(columnId: number, rowId: number) {
    this._columnId = columnId;
    this._rowId = rowId;
  }

  public update(newValue: any, evaluated: any): void {
    this._value = newValue;
    this.evaluatedValue = evaluated;
    this.format();
  }

  public to(): any {
    return {
      colSpan: this.colSpan,
      rowSpan: this.rowSpan,
      formattedValue: this.formattedValue,
      evaluatedValue: this.evaluatedValue,
      _columnId: this._columnId,
      _rowId: this._rowId,
      _value: this._value,
      reference: this.reference && this.reference.to(),
    };
  }

  private format() {
    this.formattedValue = this.evaluatedValue;
  }
}
