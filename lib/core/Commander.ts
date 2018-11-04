import { OpenDocument } from "./Document";
import { CommandHistory } from "./CommandHistory";
import { Sheet } from "./Sheet";
import { clone } from "../common/utils";
import { Appearance, TextAlign } from "./Appearance";

export class Commander {
    private history:CommandHistory[]=[];
    private commands=[];

    public constructor (private doc:OpenDocument) {
        this.commands['bold']= () => this.bold();
        this.commands['italic']= () => this.italic();
        this.commands['underline']= () => this.underline();
        this.commands['fontSize']= (size) => this.fontSize(size);
        this.commands['fontName']= (size) => this.fontName(size);
        this.commands['bgcolor'] = (color) => this.bgColor(color);
        this.commands['merge'] = () => this.merge();
        this.commands['unmerge'] = () => this.unmerge();
        this.commands['align'] = (value) => this.align(value);
    }

    private has (commandName){
        return !!this.commands[commandName];
    }

    do (commandName,...args){
        if(!this.has(commandName)){
            console.warn(`command ${commandName} does not exsits!`);
        }

        this.commands[commandName](...args);
    }

    private get ActiveSheet():Sheet{
        return this.doc.ActiveSheet;
    }

    private get Selection () {
        return this.ActiveSheet.selection;
    }

    private get SelectedAppearance ():Appearance {
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        return clone(sheet.getCellApperance(sel.columnId,sel.rowId));
    }

    private get SelectionData () {
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        let data = [];

        for(let c=sel.left;c <= sel.right;c++) { 
            for(let r=sel.top;r<= sel.bottom;r++) {
                let cell = sheet.getCell(c,r);
                data.push(clone(cell));

            }
        }

        return data;
    }

    private logAppearanceOnlyCommnand () {
        let sel = this.Selection;
        let historyItem:CommandHistory = {
            selection:sel,
            appearance:this.SelectedAppearance
        };

        this.history.push(historyItem);
    }

    private logDataOnlyCommand () {
        let sel = this.Selection;
        let historyItem:CommandHistory = {
            selection:sel,
            data: this.SelectionData
        };

        this.history.push(historyItem);
    }

    private merge () {
        this.logDataOnlyCommand();
        let sel = this.Selection;
        let c = Math.min(sel.right, sel.left);
        let r = Math.min(sel.top, sel.bottom);
        let w = Math.abs(sel.right - sel.left) + 1;
        let h = Math.abs(sel.top - sel.bottom) + 1;
        this.ActiveSheet.merge(c, r, w,h);
    }

    private unmerge () {
        this.logDataOnlyCommand();
        let sel = this.Selection;
        this.ActiveSheet.unmerge(sel.columnId, sel.rowId);
    }

    private toggle (str,t) {
        str = str || '';
        if(str.indexOf(t) != -1) {
            return str.replace(t, '')
        }
        return `${str} ${t}`;
    }


    private align (value) {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        if(value=='right') app.textAlign = TextAlign.Right;
        else if(value=='left') app.textAlign = TextAlign.Left;
        else if(value=='center') app.textAlign = TextAlign.Center;
        else throw `${value} is not a valid value`;
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private bold () {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.textStyle = this.toggle(app.textStyle, ' bold');
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private italic () {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.textStyle = this.toggle(app.textStyle, ' italic');
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private underline () {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.textStyle = this.toggle(app.textStyle, ' underline');
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private bgColor (color) {
        console.log('color is: ',color)
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.background = color;
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private fontSize(size) {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.fontSize = size;
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private fontName(size) {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.fontName = size;
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    public undo(){
        throw 'undo has not been implemented';
    }

    public redo(){
        throw 'redo has not been implemented'
    }

}