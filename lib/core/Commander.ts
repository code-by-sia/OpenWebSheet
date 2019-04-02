import {OpenDocument} from "./Document";
import {CommandHistory} from "./CommandHistory";
import {Sheet} from "./Sheet";
import {clone} from "../common/utils";
import {Appearance, TextAlign} from "./Appearance";

export class Commander {
    private history: CommandHistory[] = [];
    private commands = [];

    public constructor(private doc: OpenDocument) {
        this.commands['bold'] = () => this.appearance(app => app.bold = !app.bold);
        this.commands['italic'] = () => this.appearance(app => app.italic = !app.italic);
        this.commands['underline'] = () => this.appearance(app => app.underline = !app.underline);
        this.commands['font-size'] = (size) => this.appearance(app => app.fontSize = size);
        this.commands['font-name'] = (font) => this.appearance(app => app.fontName = font);
        this.commands['bg-color'] = (color) => this.appearance(app => app.background = color);
        this.commands['fg-color'] = (color) => this.appearance(app => app.text = color);
        this.commands['top-border'] = (color) => this.topBorder(color);
        this.commands['no-border'] = () => this.noBorder();
        this.commands['left-border'] = (color) => this.leftBorder(color);
        this.commands['right-border'] = (color) => this.rightBorder(color);
        this.commands['bottom-border'] = (color) => this.bottomBorder(color);
        this.commands['cross-border'] = (color) => this.crossBorder(color);
        this.commands['full-border'] = (color) => {
            this.topBorder(color);
            this.leftBorder(color)
            this.appearance(app => {
                app.setVertical(color);
                app.setHorizontal(color);
            });
        };
        this.commands['merge'] = () => this.merge();
        this.commands['unmerge'] = () => this.unmerge();
        this.commands['align'] = (value) => this.appearance(app => app.alignTextTo(value));
        this.commands['change-value'] = (columnId, rowId, value) => this.changeValue(columnId, rowId, value);
        this.commands['alter-column'] = (columnId, delta) => this.alterColumn(columnId, delta);
        this.commands['alter-row'] = (rowId, delta) => this.alterRow(rowId, delta);
    }

    private has(commandName) {
        return !!this.commands[commandName];
    }

    do(commandName, ...args) {
        if (!this.has(commandName)) {
            console.warn(`command ${commandName} does not exsits!`);
        }

        this.commands[commandName](...args);
    }

    private get ActiveSheet(): Sheet {
        return this.doc.ActiveSheet;
    }

    private get Selection() {
        return this.ActiveSheet.selection;
    }

    private crossBorder(color) {
        this.logAppearanceOnlyCommand();
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        for(let c=sel.left;c<= sel.right;c++) {
            for(let r=sel.top;r<= sel.bottom;r++) {
                let app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
                if(r < sel.bottom) app.setHorizontal(color);
                if(c < sel.right) app.setVertical(color);
                this.ActiveSheet.setCellAppearance(c, r, app, false);
            }
        }
    }

    private noBorder(){
        
        this.topBorder(null);
        this.leftBorder(null)
        this.appearance(app => {
            app.setVertical(null);
            app.setHorizontal(null);
        });
    }
    private topBorder(color) {
        this.logAppearanceOnlyCommand();
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        let r = sel.top - 1;
        for (let c = sel.left; c <= sel.right; c++) {
            let app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
            app.setHorizontal(color);
            this.ActiveSheet.setCellAppearance(c, r, app, false);
        }
    }

    private leftBorder(color) {
        this.logAppearanceOnlyCommand();
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        let c = sel.left - 1;
        for (let r = sel.top; r <= sel.bottom; r++) {
            let app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
            app.setVertical(color);
            this.ActiveSheet.setCellAppearance(c, r, app, false);
        }
    }

    private rightBorder(color) {
        this.logAppearanceOnlyCommand();
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        let c = sel.right;
        for (let r = sel.top; r <= sel.bottom; r++) {
            let app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
            app.setVertical(color);
            this.ActiveSheet.setCellAppearance(c, r, app, false);
        }
    }

    private bottomBorder(color) {
        this.logAppearanceOnlyCommand();
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        for (let c = sel.left; c <= sel.right; c++) {
            let app = this.ActiveSheet.getCellAppearance(c, sel.bottom) || new Appearance();
            app.setHorizontal(color);
            this.ActiveSheet.setCellAppearance(c, sel.rowId - 1, app, false);
        }
    }

    private get SelectedAppearance(): Appearance [] {
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        let apps = [];
        for (let r = sel.top; r <= sel.bottom; r++) {
            for (let c = sel.left; c <= sel.right; c++) {
                let app = sheet.getCellAppearance(sel.columnId, sel.rowId);
                if (app) {
                    apps.push(clone(app));
                }
            }
        }
        return apps;
    }

    private get SelectionData() {
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        let data = [];

        for (let c = sel.left; c <= sel.right; c++) {
            for (let r = sel.top; r <= sel.bottom; r++) {
                let cell = sheet.getCell(c, r);
                data.push(clone(cell));
            }
        }

        return data;
    }

    private logAppearanceOnlyCommand() {
        let sel = this.Selection;
        let historyItem: CommandHistory = {
            selection: sel,
            appearance: this.SelectedAppearance
        };

        this.history.push(historyItem);
    }

    private logDataOnlyCommand() {
        let sel = this.Selection;
        let historyItem: CommandHistory = {
            selection: sel,
            data: this.SelectionData
        };

        this.history.push(historyItem);
    }

    private alterColumn(column, delta) {
        const w = this.doc.ActiveSheet.getColumnWidth(column);
        this.history.push({
            selection: column,
            data: w,
            meta: 'COLUMN'
        });

        this.doc.ActiveSheet.setColumnWidth(column, w + delta);
    }

    private alterRow(row, delta) {
        const h = this.doc.ActiveSheet.getRowHeight(row);
        this.history.push({
            selection: row,
            data: h,
            meta: 'ROW'
        });

        this.doc.ActiveSheet.setRowHeight(row, h + delta);
    }

    private changeValue(columnId, rowId, value) {
        this.logDataOnlyCommand();
        if (columnId == null) columnId = this.Selection.columnId;
        if (rowId == null) rowId = this.Selection.rowId;
        this.ActiveSheet.setCellValue(columnId, rowId, value);
    }

    private merge() {
        this.logDataOnlyCommand();
        let sel = this.Selection;
        let c = Math.min(sel.right, sel.left);
        let r = Math.min(sel.top, sel.bottom);
        let w = Math.abs(sel.right - sel.left) + 1;
        let h = Math.abs(sel.top - sel.bottom) + 1;
        this.ActiveSheet.merge(c, r, w, h);
    }

    private unmerge() {
        this.logDataOnlyCommand();
        let sel = this.Selection;
        this.ActiveSheet.unmerge(sel.columnId, sel.rowId);
    }

    private appearance(method: (app: Appearance) => void): void {
        this.logAppearanceOnlyCommand();
        let sel = this.Selection;
        for (let r = sel.top; r <= sel.bottom; r++) {
            for (let c = sel.left; c <= sel.right; c++) {
                let app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance();
                method(app);
                this.ActiveSheet.setCellAppearance(c, r, app);
            }
        }
    }

    public undo() {
        throw 'undo has not been implemented';
    }

    public redo() {
        throw 'redo has not been implemented'
    }

}