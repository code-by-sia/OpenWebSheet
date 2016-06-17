///<reference path="WebSheet.ts"/>
import Collator = Intl.Collator;
/**
 * Created by SiamandM on 6/16/2016.
 */
class Cell {

    public fontName:string;
    public value:string;
    public rowSpan:number=1;
    public colSpan:number=1;
    public fill= '#fff';
    public textFill='#000';
    public textAlign=TextAlignment.Left;

    constructor(public sheet:Sheet,public columnId:number, public rowId:number){

    }

    public paintCell(context:Context,x:number,y:number){
        let column = this.sheet.getColumn(this.columnId);
        let row = this.sheet.getRow(this.rowId);

        context.fillStyle=this.fill;
        context.strokeStyle = this.textFill;
        context.textAlign=this.textAlign;
        //context.rect(x+Column.HeaderHeight , y+ Row.HeaderWidth ,column.width,row.height);
        context.fillText(this.value,x+Column.HeaderHeight + 5,y+Row.HeaderWidth + 7,column.width);
    }

    save(){
        if(!this.sheet.cells[this.columnId]){
            this.sheet.cells[this.columnId]=[];
        }
        this.sheet.cells[this.columnId][this.rowId]=this;
    }
}

class Column extends Cell {

    public static DefaultWidth:number=100;
    public static HeaderHeight:number=30;

    public width:number ;

    constructor(sheet:Sheet,id:number){
        super(sheet,id,0);
        this.value = Column.get_columnName(id);
        this.width = Column.DefaultWidth;
    }

    static get_columnName(column) {
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

    paint(context:Context,left:number){
        context.strokeSize=1;
        context.strokeStyle='#ccc';
        context.fillStyle='#fafafa';
        context.fontName='Tahoma';
        context.fontSize=12;
        context.rect(left,0,this.width,Column.HeaderHeight-1);
        context.fillRect(left,0,this.width,Column.HeaderHeight-1);
        context.fillText(this.value,left,7,this.width);
    }

    save(){
        this.sheet.columns[this.columnId]=this;
    }
}

class Row extends  Cell {

    public static DefaultHeight:number=30;
    public static HeaderWidth:number=30;

    public height:number;

    constructor(sheet:Sheet,id:number){
        super(sheet,0,id);
        this.value = id.toString();
        this.height = Row.DefaultHeight;
    }

    paint(context:Context,top:number){
        context.strokeSize=1;
        context.fillStyle='#fafafa';
        context.rect(0,top,Row.HeaderWidth,this.height);
        context.fillRect(0,top,Row.HeaderWidth,this.height);

        context.fontSize=12;
        context.textAlign=TextAlignment.Center;

        context.fillText(this.value,0,top + (Row.DefaultHeight-12)/2,Row.HeaderWidth );
    }

    save(){
        this.sheet.rows[this.rowId]=this;
    }
}

class Sheet {
    public title:string;
    public active:boolean=false;
    public columns:Column[]=[];
    public rows:Row[]=[];
    public cells:Cell[][]=[[]];
    public top:number=1;
    public left:number=0;
    private right:number;
    private bottom:number;
    public tabWidth:number;

    constructor(private websheet:WebSheet){

    }

    scrollLeft(){
        if(this.left>0){
            this.left--;
        }
    }

    scrollRight(){
        this.left++;
    }

    scrollUp(){
        if(this.top>1){
            this.top--;
        }
    }

    scrollDown(){
        this.top++;
    }

    isCellExists(columnId:number,rowId:number){
        if(this.cells[columnId]){
            if(this.cells[columnId][rowId]){
                return true;
            }
        }
        return false;
    }

    getCell(columnId:number,rowId:number){
        if(this.isCellExists(columnId,rowId)){
            return this.cells[columnId][rowId];
        }
        return new Cell(this,columnId,rowId);
    }

    getRow(rowId:number):Row{
        if(this.rows[rowId]){
            return this.rows[rowId];
        }else{
            return new Row(this,rowId);
        }
    }


    getColumn(columnId:number):Column{
        if(this.columns[columnId]){
            return this.columns[columnId];
        }else{
            return new Column(this,columnId);
        }
    }

    render(context:Context){
        let width = this.websheet.width;
        let height = this.websheet.height;

        let sheetTitleHeight = WebSheet.SheetTitleHeight;
        let maskHeight =height - sheetTitleHeight;

        context.setMask(0,0,width,height-(sheetTitleHeight+1.5));
        this.renderRows(context);
        this.renderColumns(context);
        context.unmask();

        context.setMask(Column.HeaderHeight,Row.HeaderWidth,width,maskHeight - Row.HeaderWidth);
        this.renderCells(context);
        context.unmask();
    }

    renderRows(context:Context){
        let height = this.websheet.height - Row.HeaderWidth;// - WebSheet.SheetTitleHeight;
        let cumulativeHeight = Row.DefaultHeight;
        this.bottom = this.top;
        let rw= this.top;
        for(;cumulativeHeight<=height;rw++){
            let row = this.getRow(rw);
            row.paint(context,cumulativeHeight);
            cumulativeHeight+=row.height;
            this.bottom = rw;
        }
    }

    renderColumns(context:Context){
        let width = this.websheet.width;
        let cumulativeWidth = Row.HeaderWidth + .5;
        let cl = this.left;
        for(cl=this.left;cumulativeWidth<=width;cl++){
            let column = this.getColumn(cl);
            column.paint(context,cumulativeWidth);
            cumulativeWidth += column.width;
        }
        this.right=cl;
    }

    renderCells(context:Context){
        let x:number=0;
        let y:number=0;

        let cellsToPaint = [];

        context.strokeStyle='#eee';
        context.strokeSize=1;
        for(let r=this.left;r<=this.bottom;r++){
            let row = this.getRow(r);
            x=0;
            for(let c=this.left;c<=this.right;c++){
                let column = this.getColumn(c);
                if(this.isCellExists(c,r)){
                    let cell = this.getCell(c,r);
                    cellsToPaint.push({
                       x,y,cell
                    });
                }
                if(y>0){
                    context.line(x + Row.HeaderWidth ,y+row.height,x+ Row.HeaderWidth+column.width,y+row.height);
                    context.line(x + Row.HeaderWidth +  column.width ,y,x+Row.HeaderWidth + column.width,y+row.height);
                }
                x+= column.width;
            }
            y+=row.height;
        }

        for(let i=0;i<cellsToPaint.length;i++){
            let p = cellsToPaint[i];
            p.cell.paintCell(context,p.x,p.y);
        }

    }

}