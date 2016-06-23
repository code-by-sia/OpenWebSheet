///<reference path="WebSheet.ts"/>
import Collator = Intl.Collator;
/**
 * Created by SiamandM on 6/16/2016.
 */
enum BorderSize{
    None,
    Thin,
    Thick
}
class TextStyle{
    public fontName:string=null;
    public fontSize:number=null;
    public fill=null;
    public textAlign:TextAlignment=null;
}

class BorderStyle {
    public borderSize:BorderSize=null;
    public strokeFill=null;
}

class Cell {

    public value:string="";
    public rowSpan:number=1;
    public colSpan:number=1;

    public textStyle:TextStyle=null;
    public verticalBorder:BorderStyle=null;
    public horizontalBorder:BorderStyle=null;
    public fill=null;

    constructor(public sheet:Sheet,public columnId:number, public rowId:number){

    }

    public getColumn(){
        return this.sheet.getColumn(this.columnId);
    }

    public getRow(){
        return this.sheet.getRow(this.rowId);
    }

    public getWidth(){
        let result = 0;
        for(let i=0;i<this.colSpan;i++){
            result += this.sheet.getColumnWidth(i + this.columnId);
        }
        return result;
    }

    public getHeight(){
        let result = 0;
        for(let i=0;i<this.rowSpan;i++){
            result += this.sheet.getRowHeight(i + this.rowId);
        }
        return result;
    }

    public getFill(){
        if(this.fill != null)return this.fill;
        let col = this.getColumn();
        if(col.fill!=null)return col.fill;
        let row = this.getRow();
        if(row.fill != null)return row.fill;
        return this.sheet.fill;
    }

    public getTextStyle(){
        if(this.textStyle!=null)return this.textStyle;
        let col = this.getColumn();
        if(col.textStyle != null)return col.textStyle;
        let row = this.getRow();
        if(row.textStyle != null)return row.textStyle;
        return this.sheet.textStyle;
    }

    public getHorizontalBorderStyle(){
        if(this.horizontalBorder!=null)return this.horizontalBorder;
        let col = this.getColumn();
        if(col.horizontalBorder!=null)return col.horizontalBorder;
        let row = this.getRow();
        if(row.horizontalBorder!=null)return row.horizontalBorder;
        return this.sheet.horizontalBorder;
    }

    public getVerticalBorderStyle(){
        if(this.verticalBorder!=null)return this.verticalBorder;
        let col = this.getColumn();
        if(col.verticalBorder!=null)return col.verticalBorder;
        let row = this.getRow();
        if(row.verticalBorder!=null)return row.verticalBorder;
        return this.sheet.verticalBorder;
    }

    public paintCell(context:Context,x:number,y:number){
        if(this.rowId<1 || this.columnId < 0){
            return;
        }
        let column = this.sheet.getColumn(this.columnId);
        let row = this.sheet.getRow(this.rowId);

        let fill = this.getFill();
        let textStyle = this.getTextStyle();

        let left = x + Column.HeaderHeight + .5;
        if(y < Row.DefaultHeight)return;

        context.fillStyle=fill;
        context.fillRect(left, y ,column.width-.5,row.height);
        context.fillStyle = textStyle.fill;
        context.strokeStyle = textStyle.fill;
        context.textAlign= textStyle.textAlign;
        context.fillText(this.value,x+Column.HeaderHeight + 5,y+ 7,column.width);
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

class CellSelection {
    public left:number;
    public top:number;
    public right:number;
    public bottom:number;

    public rowId:number;
    public columnId:number;
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

    public textStyle:TextStyle=null;
    public verticalBorder:BorderStyle=null;
    public horizontalBorder:BorderStyle=null;
    public fill=null;

    public selection:CellSelection;

    constructor(private websheet:WebSheet){
        this.textStyle = new TextStyle();
        this.textStyle.fill='#000';
        this.textStyle.fontName='Tahoma';
        this.textStyle.textAlign=TextAlignment.Left;

        this.verticalBorder = new BorderStyle();
        this.verticalBorder.borderSize=BorderSize.None;
        this.verticalBorder.strokeFill = '#eee';

        this.horizontalBorder = new BorderStyle();
        this.horizontalBorder.borderSize=BorderSize.None;
        this.horizontalBorder.strokeFill = '#eee';

        this.fill = '#fff';

        this.selection = new CellSelection();
        this.selection.top=1;
        this.selection.left=0;
        this.selection.right=0;
        this.selection.bottom=1;
        this.selection.rowId=1;
        this.selection.columnId=0;
    }

    getColumnWidth(columnId:number){
        if(this.columns[columnId])
        {
            return this.columns[columnId].width;
        }
        return Column.DefaultWidth;
    }

    getRowHeight(rowId:number){
        if(this.rows[rowId]){
            return this.rows[rowId].height;
        }
        return Row.DefaultHeight;
    }

    getColumnLeft(columnId:number){
        let result = 0;
        for(let i=0;i<columnId;i++){
            if(this.columns[i]){
                result+= this.columns[i].width;
            }else{
                result+= Column.DefaultWidth;
            }
        }
        return result;
    }

    getColumnRight(columnId:number){
        let result = 0;
        for(let i=0;i<=columnId;i++){
            if(this.columns[i]){
                result+= this.columns[i].width;
            }else{
                result+= Column.DefaultWidth;
            }
        }
        return result;
    }

    getRowTop(rowId:number){
        let result =0;
        for(let i=1;i<rowId;i++){
            if(this.rows[i]){
                result += this.rows[i].height;
            }else{
                result += Row.DefaultHeight;
            }
        }
        return result;
    }

    getRowBottom(rowId:number){
        let result =0;
        for(let i=1;i<=rowId;i++){
            if(this.rows[i]){
                result += this.rows[i].height;
            }else{
                result += Row.DefaultHeight;
            }
        }
        return result;
    }

    findColumnIdByX(x){
        let colX=this.getColumn(0).width;
        let colId=0;
        while (colX < x){
            if(this.columns[colId]){
                colX += this.columns[colId].width;
            }else{
                colX += Column.DefaultWidth;
            }
            colId++;
        }
        return colId;
    }

    findRowIdByY(y){
        let rowY=this.getRow(0).height;
        let rowId=1;
        while (rowY < y){
            if(this.rows[rowId]){
                rowY += this.rows[rowId].height;
            }else{
                rowY += Row.DefaultHeight;
            }
            rowId++;
        }
        return rowId;
    }


    findCellByXY(x,y){
        let colId = this.findColumnIdByX(x);
        let rowId = this.findRowIdByY(y);
        return this.getCell(colId,rowId);
    }

    selectByXY(x1,y1,x2,y2){
        let top = Math.min(y1,y2);
        let left = Math.min(x1,x2);
        let right=Math.max(x1,x2);
        let bottom = Math.max(y1,y2);

        this.selection.top = this.findRowIdByY(top);
        this.selection.bottom = this.findRowIdByY(bottom);
        this.selection.left = this.findColumnIdByX(left);
        this.selection.right = this.findColumnIdByX(right);
        this.selection.rowId = this.findRowIdByY(y1);
        this.selection.columnId= this.findColumnIdByX(x1);
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

    getCell(columnId:number,rowId:number):Cell{
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

        context.setMask(Column.HeaderHeight + .5,Row.HeaderWidth ,width,maskHeight - Row.HeaderWidth);
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

        for(let r=this.top-1;r<=this.bottom;r++){
            let row = this.getRow(r);
            x=0;
            for(let c=this.left;c<=this.right;c++){
                let column = this.getColumn(c);
                let cell = this.getCell(c,r);

                cell.paintCell(context,x,y);
                if(y>0){
                    let horStyle = cell.getHorizontalBorderStyle();
                    let verStyle = cell.getVerticalBorderStyle();
                    context.strokeStyle = horStyle.strokeFill;
                    context.line(x + Row.HeaderWidth ,y+row.height,x+ Row.HeaderWidth+column.width,y+row.height);
                    context.strokeStyle = verStyle.strokeFill;
                    context.line(x + Row.HeaderWidth +  column.width ,y,x+Row.HeaderWidth + column.width,y+row.height);
                }
                x+= column.width;
            }
            y+=row.height;
        }


    }

}