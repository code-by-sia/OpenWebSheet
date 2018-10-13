import { OpenDocument } from "./Document";
import { CommandHistory } from "./CommandHistory";
import { Sheet } from "./Sheet";
import { clone } from "../common/utils";
import { Appearance } from "./Appearance";

export class Commander {
    private history:CommandHistory[]=[];
    private commands=[];

    public constructor(private doc:OpenDocument) {
        this.commands['bold']= () => this.bold();
        this.commands['italic']= () => this.italic();
        this.commands['fontSize']= (size) => this.fontSize(size);
        this.commands['fontName']= (size) => this.fontName(size);
    }

    private has(commandName){
        return !!this.commands[commandName];
    }

    do(commandName,...args){
        if(!this.has(commandName)){
            console.warn(`command ${commandName} does not exsits!`);
        }

        this.commands[commandName](...args);
    }

    private get ActiveSheet():Sheet{
        return this.doc.ActiveSheet;
    }

    private get Selection() {
        return this.ActiveSheet.selection;
    }

    private get SelectedAppearance():Appearance {
        let sel = this.Selection;
        let sheet = this.doc.ActiveSheet;
        return clone(sheet.getCellApperance(sel.columnId,sel.rowId));
    }


    private logAppearanceOnlyCommnand(){
        let sel = this.Selection;
        let historyItem:CommandHistory = {
            selection:sel,
            appearance:this.SelectedAppearance
        };

        this.history.push(historyItem);
    }

    private bold () {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.textStyle = (app.textStyle==='bold')?'':'bold';
        this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
    }

    private italic () {
        this.logAppearanceOnlyCommnand();
        let sel = this.Selection;
        let app = this.SelectedAppearance || new Appearance();
        app.textStyle = (app.textStyle==='italic')?'':'italic';
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