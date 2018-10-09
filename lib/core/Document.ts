import {Sheet} from './Sheet';

export class OpenDocument {
    
    private sheets:Sheet[]=[];
    private activeSheetIndex=0;

    public constructor () {
        this.init();
    }

    private init() {
        this.sheets.push(new Sheet("Sheet1"));
        this.sheets.push(new Sheet("Sheet2"));
        this.sheets.push(new Sheet("Sheet3"));
    }

    public get ActiveSheet() {
        return this.sheets[this.activeSheetIndex];
    }

    public get ActiveSheetIndex(){
        return this.activeSheetIndex;
    }

    public set ActiveSheetIndex(index:number){
        if(index <0 || index >= this.sheets.length){
            throw 'invalid sheet index';
        }
        
        this.activeSheetIndex = index;
    }

    public get Sheets(): Sheet[] {
        return this.sheets;
    }
}