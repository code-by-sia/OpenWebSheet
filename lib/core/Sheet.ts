import { Cell } from "./Cell";
import { Appearance, Border } from "./Appearance";
import { ColumnDefaultWidth, RowDefaultHeight } from "../common/constants";


export class CellSelection {
    public left:number;
    public top:number;
    public right:number;
    public bottom:number;

    public rowId:number;
    public columnId:number;

    public get single(){
        return this.right == this.left && this.top == this.bottom
    }
}

export class Sheet { 

    private data:any[] = [];
    public defaultAppearance:Appearance = new Appearance();
    public defaultRowHeight = 30;
    public defaultColumnWidth = 100;
    private appearance:any[] = [];
    private columnAppearance:Appearance[] = [];
    private rowAppearance:Appearance[] = [];
    private rowHeight:number[] = [];
    private columnWidth:number[] = []
    private scrollX:number = 0;
    private scrollY:number = 0;
    public selection: CellSelection ;


    constructor(public title:string){
        this.defaultAppearance.background = '#fff';
        this.defaultAppearance.fontName = 'lato';
        this.defaultAppearance.fontSize= 12;
        this.defaultAppearance.horisontalBorder = new Border('#eee');
        this.defaultAppearance.verticalBorder = new Border('#eee');
        this.defaultAppearance.text = '#444';


        this.selection = new CellSelection();
        this.selection.top = 1;
        this.selection.left = 0;
        this.selection.right = 0;
        this.selection.bottom = 1;
        this.selection.rowId = 1;
        this.selection.columnId = 0;
    }
    selectNextColumnCell() {
        this.selection.columnId++;
        
        if(this.selection.single){
            this.selection.right = this.selection.columnId;
            this.selection.left = this.selection.columnId;
            return;
        }
        
        if(this.selection.columnId > this.selection.right){
            this.selection.columnId = this.selection.left;
            if(this.selection.rowId == this.selection.bottom) {
                this.selection.rowId = this.selection.top;
            } else {
                this.selectNextRowCell();
            }
            
        }
    }

    selectPreviousColumnCell() {
        this.selection.columnId--;

        if(this.selection.single){
            this.selection.right = this.selection.columnId;
            this.selection.left = this.selection.columnId;
            return;
        }
        
        if(this.selection.columnId < this.selection.left){
            this.selection.columnId = this.selection.right;
            if(this.selection.rowId == this.selection.top){ 
                this.selection.rowId = this.selection.bottom;
            } else {
                this.selectPreviousRowCell();
            }
        }
    }

    selectNextRowCell() {
        this.selection.rowId++;
        if(this.selection.single){
            this.selection.top = this.selection.rowId;
            this.selection.bottom = this.selection.rowId;
            return;
        }
        
        if(this.selection.rowId > this.selection.bottom){
            this.selection.rowId = this.selection.top;
            if(this.selection.columnId == this.selection.right){ 
                this.selection.columnId = this.selection.left;
            } else {  
                this.selectNextColumnCell();
            }
        }
    }
    selectPreviousRowCell() {
        this.selection.rowId--;

        if(this.selection.single){
            this.selection.top = this.selection.rowId;
            this.selection.bottom = this.selection.rowId;
            return;
        }
        
        if(this.selection.rowId < this.selection.top){
            this.selection.rowId = this.selection.bottom;
            if(this.selection.columnId == this.selection.left) { 
                this.selection.columnId = this.selection.right;
            } else {
                this.selectPreviousColumnCell();
            }
        }
    }


    getColumnLeft(columnId:number) {
        let result = 0;
        for (let i = this.scrollColumn; i < columnId; i++) {
            result += this.getColumnWidth(i);
        }
        return result;
    }

    getColumnRight(columnId:number) {
        return this.getColumnLeft(columnId) + this.getColumnWidth(columnId);
    }

    getRowTop(rowId:number) {
        let result = 0;
        for (let i = this.scrollRow; i < rowId; i++) {
            result += this.getRowHeight(i);
        }
        return result;
    }

    getRowBottom(rowId:number) {
        return this.getRowTop(rowId) + this.getRowHeight(rowId);
    }

    findColumnIdByX(x) {
        if(x < 0) return 0;
        let colX = 0;
        for (let colId = this.scrollColumn; ; colId++) {
            if(colId > this.scrollColumn + 100) return 0;
            let colW = this.getColumnWidth(colId);
            if (x > colX && x < colX + colW) {
                return colId;
            }
            colX += colW;
        }
    }

    findRowIdByY(y) {
        let rowY = this.getRowHeight(this.scrollRow);
        let rowId = this.scrollRow;
        while (rowY < y) {
            rowY += this.getRowHeight(rowId);
            rowId++;
        }
        return rowId;
    }


    findCellByXY(x, y) {
        let colId = this.findColumnIdByX(x);
        let rowId = this.findRowIdByY(y);
        return this.getCell(colId, rowId);
    }


    public selectByXY(x1: number, y1: number, x2: number, y2: number): any {
        let top = Math.min(y1, y2);
        let left = Math.min(x1, x2);
        let right = Math.max(x1, x2);
        let bottom = Math.max(y1, y2);

        this.selection.top = this.findRowIdByY(top);
        this.selection.bottom = this.findRowIdByY(bottom);
        this.selection.left = this.findColumnIdByX(left);
        this.selection.right = this.findColumnIdByX(right);
        this.selection.rowId = this.findRowIdByY(y1);
        this.selection.columnId = this.findColumnIdByX(x1);
    }   

    public scrollDown(): any {
        this.scroll(this.scrollColumn,this.scrollRow + 1);
    }

    public scrollUp(): any {
        this.scroll(this.scrollColumn,this.scrollRow - 1);
    }

    public scrollLeft(): any {
        this.scroll(this.scrollColumn + 1,this.scrollRow);
    }
    
    public scrollRight(): any {
        this.scroll(this.scrollColumn - 1,this.scrollRow);
    }

    public getCellHeight(cell: Cell): number {
        let height = 0;
        for(let i=cell.rowId;i<cell.rowId + cell.rowSpan;i++){
            height += this.getRowHeight(i); 
        }
        return height;
    }
    
    public getCellWidth(cell: Cell): number {
        let width = 0;
        for(let i=cell.columnId;i< cell.columnId + cell.colSpan;i++){
            width += this.getColumnWidth(i); 
        }
        return width;
    }

    public scroll(columnId, rowId) {
        if(columnId < 0) return;
        if(rowId < 0) return;
        for(let x in this.data){
            for (let y in this.data[x]){
                let cell:Cell = this.data[x][y];
                if(cell.columnId < parseInt(x)) {
                    columnId = cell.columnId + cell.colSpan;
                }
                if(cell.rowId < parseInt(y)) {
                    rowId = cell.rowId + cell.rowSpan;
                }                
            }
        }

        this.scrollX = columnId;
        this.scrollY = rowId;
    }

    public merge(columnId:number, rowId:number, width:number, height:number){
        let cell = this.forceGetCell(columnId, rowId);
        cell.colSpan = width;
        cell.rowSpan = height;
        for(let x = columnId; x < columnId + width; x++){
            for(let y=rowId; y < rowId + height; y++){
                this.setCell(columnId, rowId, cell);
            }
        }
    }

    public unmerge(columnId:number, rowId:number){
        let cell = this.getCell(columnId, rowId);
        if(!cell || (cell.rowSpan != 0 && cell.colSpan != 0)) return;
        for(let x = columnId; x < columnId + cell.colSpan; x++)
        {
            for(let y = rowId; y < rowId + cell.rowSpan; y++){
                if(x!=columnId && y != rowId) {
                    this.data[columnId][rowId] = undefined;
                }
            }
        }

        cell.rowSpan = 0;
        cell.colSpan = 0;

    }

    public get scrollColumn() {
        return this.scrollX;
    }

    public get scrollRow () {
        return this.scrollY;
    }

    public forceGetCell(columnId:number, rowId:number) {
        let cell = this.getCell(columnId, rowId);
        if(!cell){
            cell = new Cell(columnId, rowId);
            this.setCell(columnId, rowId, cell);
        }

        return cell;
    }

    public getCell(columnId:number,rowId:number):Cell {
        if(!this.data[columnId] || !this.data[columnId][rowId]){
            return null;
        }

        return this.data[columnId][rowId];
    }

    public setCell(columnId:number, rowId:number, cell:Cell) {
        if(!this.data[columnId]) {
            this.data[columnId] = []
        }

        this.data[columnId][rowId] = cell;
    }


    public getColumnApperance(columnId:number):Appearance {
        return this.columnAppearance[columnId];
    }

    public getRowAppearance(rowId:number):Appearance { 
        return this.rowAppearance[rowId];
    }

    public getCellApperance(columnId:number, rowId:number):Appearance {
        if(!this.appearance[columnId] || !this.appearance[columnId][rowId]){
            return null;
        }

        return this.appearance[columnId][rowId];
    }

    public setCellAppearance(columnId:number, rowId:number,appearance:Appearance) {
        if(!this.appearance[columnId]) {
            this.appearance[columnId] = [];
        }

        this.appearance[columnId][rowId] = appearance;
    }

    public setColumApperance(columnId:number, apperance:Appearance) {
        this.columnAppearance[columnId] = apperance;
    }

    public setRowAppearance(rowId:number, apperance:Appearance) {
        this.rowAppearance[rowId] = apperance;
    }

    public getRowHeight(rowId):number {
        return this.rowHeight[rowId] || this.defaultRowHeight;
    }

    public getColumnWidth(columnId):number {
        return this.columnWidth[columnId] || this.defaultColumnWidth;
    }

    public getApperance(columnId:number,rowId:number){
        let appearance = new Appearance();
        
        let cell = this.getCellApperance(columnId, rowId);
        let col = this.getColumnApperance(columnId);
        let row  = this.getRowAppearance(rowId); 
        let def =  this.defaultAppearance;

        appearance.background = (cell && cell.background) || (col && col.background ) || (row && row.background ) || def.background;
        appearance.fontName = (cell && cell.fontName) || (col && col.fontName ) || (row && row.fontName ) || def.fontName;
        appearance.fontSize = (cell && cell.fontSize) || (col && col.fontSize ) || (row && row.fontSize ) || def.fontSize;
        appearance.horisontalBorder = (cell && cell.horisontalBorder) || (col && col.horisontalBorder ) || (row && row.horisontalBorder ) || def.horisontalBorder;
        appearance.verticalBorder = (cell && cell.verticalBorder) || (col && col.verticalBorder ) || (row && row.verticalBorder ) || def.verticalBorder;
        appearance.text = (cell && cell.text) || (col && col.text ) || (row && row.text ) || def.text;
        appearance.textAlign = (cell && cell.textAlign) || (col && col.textAlign ) || (row && row.textAlign ) || def.textAlign;
        appearance.textStyle = (cell && cell.textStyle) || (col && col.textStyle ) || (row && row.textStyle ) || def.textStyle;
        
        return appearance;

    }

    public static get_columnName(column) {
        let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let columnString = "";
        let columnNumber = column + 1;
        while (columnNumber > 0) {
            let currentLetterNumber = (columnNumber - 1) % 26;
            let currentLetter = az[currentLetterNumber];
            columnString = currentLetter + columnString;
            columnNumber = (columnNumber - (currentLetterNumber + 1)) / 26;
        }
        return columnString;
    }

}