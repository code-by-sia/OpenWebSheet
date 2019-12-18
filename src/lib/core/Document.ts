import { Sheet } from './Sheet';
import { Commander } from './Commander';

export class OpenDocument {

  public get ActiveSheet() {
    return this.sheets[this.activeSheetIndex];
  }

  public get ActiveSheetIndex() {
    return this.activeSheetIndex;
  }

  public set ActiveSheetIndex(index: number) {
    if (index < 0 || index >= this.sheets.length) {
      throw new Error('invalid sheet index');
    }

    this.activeSheetIndex = index;
    this.onChange();
  }

  public get Sheets(): Sheet[] {
    return this.sheets;
  }

  private sheets: Sheet[] = [];
  private activeSheetIndex = 0;
  private commander: Commander;
  private change_listeners: Array<() => void> = [];

  public constructor() {
    this.init();
    this.commander = new Commander(this);
  }

  public addSheet(name: string) {
    const sheet = new Sheet(name);
    sheet.addOnChange(() => this.onChange());
    this.sheets.push(sheet);
    this.onChange();
  }

  public addOnChange(handler: () => void) {
    this.change_listeners.push(handler);
  }

  public removeOnChange(handler: () => void) {
    const ix = this.change_listeners.indexOf(handler);
    if (ix >= 0) {
      this.change_listeners.splice(ix, 1);
    }
  }

  public onChange() {
    this.change_listeners.forEach((m) => m());
  }

  public execCommand(cmd: string, ...args: any[]) {
    this.commander.do(cmd, ...args);
  }

  public save() {
    return {
      sheets: this.sheets.map((sh) => sh.save()),
      activeSheetIndex: this.activeSheetIndex,
    };
  }

  public load(obj: any) {
    this.sheets = obj.sheets.map((sh: any) => Sheet.load(sh));
    this.activeSheetIndex = obj.activeSheetIndex;
    this.onChange();
  }

  private init() {
    this.addSheet('Sheet1');
    this.addSheet('Sheet2');
    this.addSheet('Sheet3');
  }
}
