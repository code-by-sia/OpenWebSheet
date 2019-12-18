import { OpenDocument } from './Document';
import { CommandHistory } from './CommandHistory';
import { Sheet } from './Sheet';
import { clone } from '../common/utils';
import { Color } from '../common/types';
import { Appearance, TextAlign } from './Appearance';

export class Commander {

  private get ActiveSheet(): Sheet {
    return this.doc.ActiveSheet;
  }

  private get Selection() {
    return this.ActiveSheet.selection;
  }

  private get SelectedAppearance(): Appearance [] {
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    const apps = [];
    for (let r = sel.top; r <= sel.bottom; r++) {
      for (let c = sel.left; c <= sel.right; c++) {
        const app = sheet.getCellAppearance(sel.columnId, sel.rowId);
        if (app) {
          apps.push(clone(app));
        }
      }
    }
    return apps;
  }

  private get SelectionData() {
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    const data = [];

    for (let c = sel.left; c <= sel.right; c++) {
      for (let r = sel.top; r <= sel.bottom; r++) {
        const cell = sheet.getCell(c, r);
        data.push(clone(cell));
      }
    }

    return data;
  }
  private history: CommandHistory[] = [];
  private commands: any = {};

  public constructor(private doc: OpenDocument) {
    this.commands.bold = () => this.appearance((app) => app.bold = !app.bold);
    this.commands.italic = () => this.appearance((app) => app.italic = !app.italic);
    this.commands.underline = () => this.appearance((app) => app.underline = !app.underline);
    this.commands['font-size'] = (size: number) => this.appearance((app) => app.fontSize = size);
    this.commands['font-name'] = (font: string) => this.appearance((app) => app.fontName = font);
    this.commands['bg-color'] = (color: Color) => this.appearance((app) => app.background = color);
    this.commands['fg-color'] = (color: Color) => this.appearance((app) => app.text = color);
    this.commands['top-border'] = (color: Color) => this.topBorder(color);
    this.commands['no-border'] = () => this.noBorder();
    this.commands['left-border'] = (color: Color) => this.leftBorder(color);
    this.commands['right-border'] = (color: Color) => this.rightBorder(color);
    this.commands['bottom-border'] = (color: Color) => this.bottomBorder(color);
    this.commands['outside-border'] = (color: Color) => this.outsideBorder(color);
    this.commands['horizontal-border'] = (color: Color) => this.horizontalBorder(color);
    this.commands['vertical-border'] = (color: Color) => this.verticalBorder(color);
    this.commands['cross-border'] = (color: Color) => this.crossBorder(color);
    this.commands['full-border'] = (color: Color) => {
      this.topBorder(color, false);
      this.leftBorder(color, false);
      this.bottomBorder(color, false);
      this.rightBorder(color, false);
      this.appearance((app) => {
        app.setVertical(color);
        app.setHorizontal(color);
      });
    };
    this.commands.merge = () => this.merge();
    this.commands.unmerge = () => this.unmerge();
    this.commands.align = (value: any) => this.appearance((app) => app.alignTextTo(value));
    this.commands['change-value'] = (columnId: number, rowId: number, value: string) => this.changeValue(columnId, rowId, value);
    this.commands['alter-column'] = (columnId: number, delta: number) => this.alterColumn(columnId, delta);
    this.commands['alter-row'] = (rowId: number, delta: number) => this.alterRow(rowId, delta);
  }

  public do(commandName: string, ...args: any[]) {
    if (!this.has(commandName)) {
      console.warn(`command ${commandName} does not exsits!`);
    }

    this.commands[commandName](...args);
  }

  public undo() {
    throw new Error('undo has not been implemented');
  }

  public redo() {
    throw new Error('redo has not been implemented');
  }

  private has(commandName: string) {
    return !!this.commands[commandName];
  }

  private outsideBorder(color: Color) {
    this.logAppearanceOnlyCommand();
    this.topBorder(color, false);
    this.rightBorder(color, false);
    this.bottomBorder(color, false);
    this.leftBorder(color, false);
  }

  private horizontalBorder(color: Color) {
    this.crossBorder(color, true, false);
  }

  private verticalBorder(color: Color) {
    this.crossBorder(color, false, true);
  }

  private crossBorder(color: Color, horizontal = true, vertical = true) {
    this.logAppearanceOnlyCommand();
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    for (let c = sel.left; c <= sel.right; c++) {
      for (let r = sel.top; r <= sel.bottom; r++) {
        const app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
        if (horizontal && r < sel.bottom) { app.setHorizontal(color); }
        if (vertical && c < sel.right) { app.setVertical(color); }
        this.ActiveSheet.setCellAppearance(c, r, app, false);
      }
    }
  }

  private noBorder() {
    this.logAppearanceOnlyCommand();
    this.topBorder(null, false);
    this.leftBorder(null, false);
    this.appearance((app) => {
      app.setVertical(null);
      app.setHorizontal(null);
    });
  }

  private topBorder(color: Color, log = true) {
    if (log) {
      this.logAppearanceOnlyCommand();
    }
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    const r = sel.top - 1;
    for (let c = sel.left; c <= sel.right; c++) {
      const app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
      app.setHorizontal(color);
      this.ActiveSheet.setCellAppearance(c, r, app, false);
    }
  }

  private leftBorder(color: Color, log = true) {
    if (log) {
      this.logAppearanceOnlyCommand();
    }
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    const c = sel.left - 1;
    for (let r = sel.top; r <= sel.bottom; r++) {
      const app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
      app.setVertical(color);
      this.ActiveSheet.setCellAppearance(c, r, app, false);
    }
  }

  private rightBorder(color: Color, log = true) {
    if (log) {
      this.logAppearanceOnlyCommand();
    }
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    const c = sel.right;
    for (let r = sel.top; r <= sel.bottom; r++) {
      const app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
      app.setVertical(color);
      this.ActiveSheet.setCellAppearance(c, r, app, false);
    }
  }

  private bottomBorder(color: Color, log = true) {
    if (log) {
      this.logAppearanceOnlyCommand();
    }
    const sel = this.Selection;
    const sheet = this.doc.ActiveSheet;
    for (let c = sel.left; c <= sel.right; c++) {
      const app = sheet.getCellAppearance(c, sel.bottom) || new Appearance();
      app.setHorizontal(color);
      sheet.setCellAppearance(c, sel.bottom, app, false);
    }
  }

  private logAppearanceOnlyCommand() {
    const sel = this.Selection;
    const historyItem: CommandHistory = {
      selection: sel,
      appearance: this.SelectedAppearance,
    };

    this.history.push(historyItem);
  }

  private logDataOnlyCommand() {
    const sel = this.Selection;
    const historyItem: CommandHistory = {
      selection: sel,
      data: this.SelectionData,
    };

    this.history.push(historyItem);
  }

  private alterColumn(column: number, delta: number) {
    const w = this.doc.ActiveSheet.getColumnWidth(column);
    this.history.push({
      selection: column,
      data: w,
      meta: 'COLUMN',
    });

    this.doc.ActiveSheet.setColumnWidth(column, w + delta);
  }

  private alterRow(row: number, delta: number) {
    const h = this.doc.ActiveSheet.getRowHeight(row);
    this.history.push({
      selection: row,
      data: h,
      meta: 'ROW',
    });

    this.doc.ActiveSheet.setRowHeight(row, h + delta);
  }

  private changeValue(columnId: number, rowId: number, value: string) {
    this.logDataOnlyCommand();
    if (columnId == null) { columnId = this.Selection.columnId; }
    if (rowId == null) { rowId = this.Selection.rowId; }
    this.ActiveSheet.setCellValue(columnId, rowId, value);
  }

  private merge() {
    this.logDataOnlyCommand();
    const sel = this.Selection;
    const c = Math.min(sel.right, sel.left);
    const r = Math.min(sel.top, sel.bottom);
    const w = Math.abs(sel.right - sel.left) + 1;
    const h = Math.abs(sel.top - sel.bottom) + 1;
    this.ActiveSheet.merge(c, r, w, h);
  }

  private unmerge() {
    this.logDataOnlyCommand();
    const sel = this.Selection;
    this.ActiveSheet.unmerge(sel.columnId, sel.rowId);
  }

  private appearance(method: (app: Appearance) => void): void {
    this.logAppearanceOnlyCommand();
    const sel = this.Selection;
    for (let r = sel.top; r <= sel.bottom; r++) {
      for (let c = sel.left; c <= sel.right; c++) {
        const app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
        method(app);
        this.ActiveSheet.setCellAppearance(c, r, app);
      }
    }
  }

}
