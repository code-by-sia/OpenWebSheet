/**
 * Created by SiamandM on 6/23/2016.
 */
///<reference path="UIHandler.ts"/>
class CellEditor {

    websheet:WebSheet;
    editorArea:HTMLDivElement;
    selectionElement:HTMLElement;


    constructor(public controler:UIHandlerControler){
        this.websheet = controler.websheet;

        this.initialize();
        this.select(this.websheet.getActiveSheet());

    }

    initialize(){
        this.editorArea = document.createElement('div');
        this.editorArea.style.position='absolute';
        this.editorArea.style.top=Column.HeaderHeight+ 'px';
        this.editorArea.style.left = Row.HeaderWidth+ 'px';
        this.editorArea.style.bottom= WebSheet.SheetTitleHeight +  'px';
        this.editorArea.style.right='0px';
        this.editorArea.style.overflow='hidden';
        this.websheet.element.appendChild(this.editorArea);

        this.selectionElement = document.createElement('div');
        this.selectionElement.style.position='absolute';
        this.selectionElement.style.border='solid 2px #33f';
        this.selectionElement.style.background='rgba(0,0,0,.1)';



        this.editorArea.appendChild(this.selectionElement);
    }


    public select(sheet:Sheet){
        let selection=  sheet.selection;

        let x1 = sheet.getColumnLeft(selection.left);
        let y1 = sheet.getRowTop(selection.top);
        let x2 = sheet.getColumnRight(selection.right);
        let y2 = sheet.getRowBottom(selection.bottom);

        let w = x2 - x1;
        let h= y2 - y1;

        this.selectionElement.style.left= (x1 -1) +  'px';
        this.selectionElement.style.top=(y1-1) + 'px';
        this.selectionElement.style.width=(w-2) + 'px';
        this.selectionElement.style.height = (h-2) + 'px';
    }

}