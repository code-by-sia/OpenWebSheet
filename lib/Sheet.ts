///<reference path="WebSheet.ts"/>
/**
 * Created by SiamandM on 6/16/2016.
 */
class Cell {

    public fontName:string;
    public value:string;
    public rowSpan:number=1;
    public colSpan:number=1;

    constructor(private sheet:Sheet,public columnId:number, public rowId:number){

    }

    public render(context:Context){

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
        context.rect(left,0,this.width,Column.HeaderHeight);
        context.fillRect(left,0,this.width,Column.HeaderHeight);
        context.fillText(this.value,left,7,this.width);
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

    constructor(private websheet:WebSheet){

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
        let bottom = this.top;
        for(let rw=this.top;cumulativeHeight<=height;rw++){
            let row = this.getRow(rw);
            row.paint(context,cumulativeHeight);
            cumulativeHeight+=row.height;
        }
    }

    renderColumns(context:Context){
        let width = this.websheet.width;
        let cumulativeWidth = Row.HeaderWidth + .5;

        for(let cl=this.left;cumulativeWidth<=width;cl++){
            let column = this.getColumn(cl);
            column.paint(context,cumulativeWidth);
            cumulativeWidth += column.width;
            this.right=cl;
        }
    }

    renderCells(context:Context){

    }

}