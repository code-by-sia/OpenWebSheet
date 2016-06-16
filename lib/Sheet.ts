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

    constructor(sheet:Sheet,id:number){
        super(sheet,id,0);
        this.value = Column.get_columnName(id);
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

    render(context:Context){

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

    render(context:Context,top:number){
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
    public left:number=1;
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
            row.render(context,cumulativeHeight);
            cumulativeHeight+=row.height;
        }
    }

    renderColumns(context:Context){

    }

    renderCells(context:Context){

    }

}