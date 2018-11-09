import {
    RowDefaultHeight,
    ColumnHeaderHeight,
    RowHeaderWidth,
    SheetTitleHeight,
    COLOR_3,
    COLOR_1,
    COLOR_LIGHT,
    COLOR_CREAM
} from '../../common/constants'
import { DocumentRenderer } from "../DocumentRenderer";
import { OpenDocument } from "../../core/Document";
import { Context, Point } from './Context';
import { TextAlign } from "../../core/Appearance";
import { Sheet } from "../../core/Sheet";


export class CanvasRenderer implements DocumentRenderer {
    private canvas:HTMLCanvasElement;
    private rendering:boolean=false;
    private renderFrameRate:number=10;//FPS
    private context: Context;

    public width:number;
    public height:number;

    
    public constructor(private container:HTMLElement,private document:OpenDocument){
        this.initialize();
        document.addOnChange(() => this.render());
    }

    initialize() {
        this.createElements();
        this.resize();
        this.render();
    }

    public get Element(): HTMLElement{
        return this.container;
    }

    createElements() {
        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.canvas);
    }

    resize() {
        let pixelRatio = window.devicePixelRatio;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        if (pixelRatio > 1) {
            this.canvas.width = this.width * pixelRatio;
            this.canvas.height = this.height * pixelRatio;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
        } else {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        this.render();
    }

    get_context2D() {
        let pixelRatio = window.devicePixelRatio;
        this.canvas.width = this.canvas.width;
        let context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        context.scale(pixelRatio, pixelRatio);
        return context;
    }

    render() {
      if(this.rendering){
        return;
      }

      this.rendering = true;
      setTimeout(() => {
        this.doRender();
        this.rendering=false;
      }, 1000 / this.renderFrameRate);

    }

    doRender() {
        console.log('%cRender',`color:${COLOR_1}`);
        let context2d = this.get_context2D();
        this.context = new Context(context2d, this.width, this.height);
        this.renderSheetTitles();
        this.renderSheet();
    }

    private renderTopCorner() {
        this.context.fillStyle = '#ececec';
        this.context.fontSize = 12;
        const cornerWidth = RowHeaderWidth - 2;
        this.context.fillClosePath(new Point(2,cornerWidth),new Point(cornerWidth,cornerWidth), new Point(cornerWidth,1));

    }

    private renderSheetTitles(){
        this.renderTopCorner();

        this.context.strokeSize = 1;
        let x1 = 0;
        let y1 = this.height - SheetTitleHeight - .5;
        let rHeight = SheetTitleHeight + 5;
        let h = this.height - SheetTitleHeight - 0.5;
        this.context.rect(x1, y1, this.width, rHeight);
        this.context.fillStyle = this.context.createGradient(0,h,0,SheetTitleHeight/3,[0,'#f0f0f0'], [1,'#fff']);
        this.context.fillRect(x1, y1, this.width, rHeight);
        this.context.textAlign = TextAlign.Center;

        let x = RowHeaderWidth;
        let active = this.document.ActiveSheet;
        const delta = 5;
        for(let sh of this.document.Sheets) {
            let sheetWidth = sh.getWidth(str => this.context.get_textWidth(str));
            this.context.strokeStyle = '#aaa';
            this.context.fillStyle = '#fafafa';
            this.context.fontStyle = 'italic';
            if(sh === active){
                this.context.fillStyle = '#fff';
                this.context.fontStyle = 'bold';
            }
            this.context.rect(x,h,sheetWidth,SheetTitleHeight - delta);
            this.context.fillText(sh.title, x,h + delta, sheetWidth)
            if(sh === active ) {
                this.context.fillStyle =  COLOR_3;
                this.context.fillRect(x, h + SheetTitleHeight - delta,sheetWidth,2);
                this.context.strokeStyle = COLOR_LIGHT;
            }
            this.context.line(x, h,x + sheetWidth, h);

            x += sheetWidth + delta;
        }
        this.context.fontStyle ='';
    }

    private renderSheet() {
        let width = this.width;
        let height = this.height;

        let sheetTitleHeight = SheetTitleHeight;
        let maskHeight = height - sheetTitleHeight;
        let context = this.context;

        context.setMask(0, 0, width, height - (sheetTitleHeight + 1.5));
        let lastRow = this.renderRows();
        let lastColumn = this.renderColumns();
        context.unmask();

        context.setMask(ColumnHeaderHeight + .5, RowHeaderWidth, width, maskHeight - RowHeaderWidth - .5);
        this.renderCells(lastColumn, lastRow);
        context.unmask();
    }

    private renderRows () {
        let context = this.context;
        let height = this.height - RowHeaderWidth - SheetTitleHeight;
        let cumulativeHeight =  RowDefaultHeight;
        let sheet = this.document.ActiveSheet;

        let rw = sheet.scrollRow;
        for (; cumulativeHeight < height; rw++) {
            let rowHeight = sheet.getRowHeight(rw);
            this.paintRow(cumulativeHeight,(rw + 1).toString());
            cumulativeHeight += rowHeight;
        }

        return rw;
    }
    private paintRow(top: number,label:string): any {
        let context = this.context;
        context.save();
        context.strokeSize = 1;
        context.strokeStyle = '#ccc';
        context.fillStyle = '#fafafa';
        context.rect(0, top, RowHeaderWidth, this.height);
        context.fillRect(0, top, RowHeaderWidth, this.height);
        context.fontSize = 12;
        context.textAlign = TextAlign.Center;
        context.fillText(label, 0, top + (RowDefaultHeight - 12) / 2, RowHeaderWidth);
        context.restore();
    }

    private renderColumns () {
        let width = this.width;
        let sheet = this.document.ActiveSheet;
        let cumulativeWidth = RowHeaderWidth + .5;
        let cl = sheet.scrollColumn;

        for (; cumulativeWidth <= width; cl++) {
            let columnWidth = sheet.getColumnWidth(cl);
            this.paintColumn(cumulativeWidth, Sheet.get_columnName(cl),columnWidth);
            cumulativeWidth += columnWidth;
        }
        return cl;
    }

    private paintColumn(left:number, label:string,columnWidth:number){
        let context = this.context;
        context.strokeSize = 1;
        context.strokeStyle = '#ccc';
        context.fillStyle = '#fafafa';
        context.fontName = 'Tahoma';
        context.fontSize = 12;
        context.rect(left, 0, this.width, ColumnHeaderHeight - 1);
        context.fillRect(left, 0, this.width,  ColumnHeaderHeight - 1);
        context.fillText(label, left, 7, columnWidth);
    }

    private renderCells (lastColumn:number, lastRow:number) {
        let x:number = 0;
        let y:number = 0;

        let sheet = this.document.ActiveSheet;
        let cellsToPaint = [];
        let context = this.context;
        context.strokeStyle = '#eee';
        context.strokeSize = 1;
        for (let r = sheet.scrollRow - 1; r < lastRow; r++) {
            let rowHeight = sheet.getRowHeight(r);
            x = 0;
            for (let c = sheet.scrollColumn; c <= lastColumn; c++) {
                let columnWidth = sheet.getColumnWidth(c);
                let cell = sheet.getCell(c, r);
                let cellHeight = cell ? sheet.getCellHeight(cell):sheet.getRowHeight(r);
                let cellWidth = cell ? sheet.getCellWidth(cell):sheet.getColumnWidth(c);
                let appearance = sheet.getAppearance(c,r);
                context.fillStyle = appearance.text;
                this.paintCell(c,r,x, y);
                
                if (y > 0 && (!cell || !cell.isMerged)) {
                    let horStyle = appearance.horizontalBorder;
                    let verStyle = appearance.verticalBorder;
                    context.strokeStyle = horStyle.color;
                    context.line(x + RowHeaderWidth, y + cellHeight, x + RowHeaderWidth + cellWidth, y + cellHeight);
                    context.strokeStyle = verStyle.color;
                    context.line(x + RowHeaderWidth + cellWidth, y, x + RowHeaderWidth + cellWidth, y + cellHeight);
                }
                x += columnWidth;
            }
            y += rowHeight;
        }
    }
    
    private paintCell(columnId:number, rowId:number, x:number, y:number) {
        let context = this.context;
        let sheet = this.document.ActiveSheet;
        let cell = sheet.getCell(columnId, rowId);
        if(cell == null || cell.isMerged) return;

        let appearance = sheet.getAppearance(columnId, rowId);
        let left = x + ColumnHeaderHeight + .5;
        if (y < RowDefaultHeight) return;

        if(appearance.fontSize) context.fontSize = parseInt(appearance.fontSize);
        if(appearance.fontName) context.fontName = appearance.fontName;
        context.fontStyle = (appearance.textStyle) ? appearance.textStyle : '';

        let cellWidth = sheet.getCellWidth(cell);
        let cellHeight = sheet.getCellHeight(cell);

        context.setMask(left, y, cellWidth - .5, cellHeight);
        context.fillStyle = appearance.background;
        context.fillRect(left, y, cellWidth - .5, cellHeight);
        if(cell.label) {
            context.contentFillStyle = appearance.text;
            context.strokeStyle = appearance.text;
            context.textAlign = appearance.textAlign;
            context.fillText(cell.label, x + ColumnHeaderHeight + 5, y + 7, cellWidth);
        }
        context.unmask();
    }
    
}