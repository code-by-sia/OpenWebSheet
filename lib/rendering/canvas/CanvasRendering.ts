import {
    RowDefaultHeight,
    ColumnHeaderHeight,
    RowHeaderWidth,
    SheetTitleHeight,
    COLOR_3,
    COLOR_1
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
      setTimeout(()=>{
        this.doRender();
        this.rendering=false;
      },1000 / this.renderFrameRate);

    }

    getSheetWidth(sheet) {
        return this.context.get_textWidth(sheet.title) + 10;
    }

    doRender() {
        console.log('%cRender',`color:${COLOR_1}`);

        let context2d = this.get_context2D();
        this.context = new Context(context2d, this.width, this.height);

        let tabStroke = '#ccc';
        let tabBar = '#eee';
        let tabFill = '#fff';
        let tabActiveStroke = COLOR_3;

        let context = this.context;

        context.fillStyle = tabBar;
        context.fillRect(0, this.height - SheetTitleHeight, this.width,SheetTitleHeight);
        context.strokeStyle = tabStroke;
        context.strokeSize = 1;
        context.rect(0, this.height - (SheetTitleHeight - .5), this.width, SheetTitleHeight);
        context.fillStyle = tabFill;

        let x = SheetTitleHeight;
        for (let i in this.document.Sheets) {
            let sheet = this.document.Sheets[i];
            let width = this.getSheetWidth(sheet);
            context.fillStyle = tabFill;
            context.strokeStyle = tabStroke;
            context.strokeSize = 1;

            let x1 = x;
            let y1 = this.height - SheetTitleHeight + .5;
            let rWidth = width + SheetTitleHeight;
            let rHeight = SheetTitleHeight - 5;

            context.rect(x1, y1, rWidth, rHeight);
            context.fillRect(x1, y1, rWidth, rHeight);
            context.fillStyle = '#ececec';
            const cornerWidth = RowHeaderWidth - 2;
            context.fillClosePath(new Point(2,cornerWidth),new Point(cornerWidth,cornerWidth), new Point(cornerWidth,1));

            if (this.document.ActiveSheetIndex == parseInt(i)) {
                this.renderSheet();

                context.fontStyle = 'bold';
                context.strokeStyle = tabFill;
                context.line(x1, y1, x1 + rWidth, y1);

                context.strokeStyle = tabActiveStroke;
                context.strokeSize = 3;
                context.line(x1, y1 + rHeight, x1 + rWidth, y1 + rHeight);
            } else {
                context.fontStyle = '';
            }

            context.textAlign = TextAlign.Center;
            context.fillText(sheet.title, x, this.height - SheetTitleHeight + 4, width + SheetTitleHeight);
            x += width + SheetTitleHeight + 5;
        }

        context = void 0;
        context2d = void 0;
    }

    private renderSheet () {
        let width = this.width;
        let height = this.height;

        let sheetTitleHeight = SheetTitleHeight;
        let maskHeight = height - sheetTitleHeight;
        let context = this.context;

        context.setMask(0, 0, width, height - (sheetTitleHeight + 1.5));
        let lastRow = this.renderRows();
        let lastColumn = this.renderColumns();
        context.unmask();

        context.setMask(ColumnHeaderHeight + .5, RowHeaderWidth, width, maskHeight - RowHeaderWidth);
        this.renderCells(lastColumn, lastRow);
        context.unmask();
    }

    private renderRows () {
        let context = this.context;
        let height = this.height - RowHeaderWidth;// - WebSheet.SheetTitleHeight;
        let cumulativeHeight =  RowDefaultHeight;
        let sheet = this.document.ActiveSheet;

        let rw = sheet.scrollRow;
        for (; cumulativeHeight <= height; rw++) {
            let rowHeight = sheet.getRowHeight(rw);
            this.paintRow(cumulativeHeight,(rw + 1).toString());
            cumulativeHeight += rowHeight;
        }

        return rw;
    }
    private paintRow(top: number,label:string): any {
        let context = this.context;
        context.strokeSize = 1;
        context.fillStyle = '#fafafa';
        context.rect(0, top, RowHeaderWidth, this.height);
        context.fillRect(0, top, RowHeaderWidth, this.height);
        context.fontSize = 12;
        context.textAlign = TextAlign.Center;
        context.fillText(label, 0, top + (RowDefaultHeight - 12) / 2, RowHeaderWidth);
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

        for (let r = sheet.scrollRow - 1; r <= lastRow; r++) {
            let rowHeight = sheet.getRowHeight(r);
            x = 0;
            for (let c = sheet.scrollColumn; c <= lastColumn; c++) {
                let columnWidth = sheet.getColumnWidth(c);
                let cell = sheet.getCell(c, r);
                let appearance = sheet.getApperance(c,r);
                this.paintCell(c,r,x, y);
                if (y > 0) {
                    let horStyle = appearance.horisontalBorder;
                    let verStyle = appearance.verticalBorder;
                    context.strokeStyle = horStyle.color;
                    context.line(x + RowHeaderWidth, y + rowHeight, x + RowHeaderWidth + columnWidth, y + rowHeight);
                    context.strokeStyle = verStyle.color;
                    context.line(x + RowHeaderWidth + columnWidth, y, x + RowHeaderWidth + columnWidth, y + rowHeight);
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
        if(cell == null) return;

        let appearance = sheet.getApperance(x,y);


        let left = x + ColumnHeaderHeight + .5;
        if (y < RowDefaultHeight) return;

        context.fillStyle = appearance.background;
        if(appearance.fontSize) context.fontSize = appearance.fontSize;
        if(appearance.fontName) context.fontName = appearance.fontName;
        let columnWidth = sheet.getColumnWidth(columnId);
        let rowHeight = sheet.getRowHeight(rowId);
        context.setMask(left, y, columnWidth - .5, rowHeight);
        context.fillRect(left, y, columnWidth - .5, rowHeight);
        context.fillStyle = appearance.text;
        context.strokeStyle = appearance.text;
        context.textAlign = appearance.textAlign;
        context.fillText(cell.label, x + ColumnHeaderHeight + 5, y + 7, columnWidth);
        context.unmask();
    }
    
}