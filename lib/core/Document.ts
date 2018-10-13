import {Sheet} from './Sheet';
import { Commander } from './Commander';

export class OpenDocument {
    
    private sheets:Sheet[]=[];
    private activeSheetIndex=0;
    private commander:Commander;
    private change_listeners = [];

    public constructor () {
        this.init();
        this.commander = new Commander(this);
    }

    private init() {
        this.addSheet("Sheet1");
        this.addSheet("Sheet2");
        this.addSheet("Sheet3");
    }

    public addSheet(name:string) {
        let sheet = new Sheet(name);
        sheet.addOnChange(() => this.onChange());
        this.sheets.push(sheet);
        this.onChange();
    }

    public get ActiveSheet() {
        return this.sheets[this.activeSheetIndex];
    }

    public get ActiveSheetIndex(){
        return this.activeSheetIndex;
    }

    public set ActiveSheetIndex(index:number){
        if(index < 0 || index >= this.sheets.length){
            throw 'invalid sheet index';
        }
        
        this.activeSheetIndex = index;
    }

    public get Sheets(): Sheet[] {
        return this.sheets;
    }

    public addOnChange(handler:()=>void) {
        this.change_listeners.push(handler);
    }

    public removeOnChange(handler:()=>void) {
        let ix = this.change_listeners.indexOf(handler);
        if (ix >= 0) {
            this.change_listeners.splice(ix,1);
        }
    }

    public onChange() {
        this.change_listeners.forEach(m => m());
    }

    public execCommand(cmd:string,...args:any[]){
        this.commander.do(cmd,...args);
    }
}