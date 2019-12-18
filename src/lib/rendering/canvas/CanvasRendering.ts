import {
  RowDefaultHeight,
  ColumnHeaderHeight,
  RowHeaderWidth,
  SheetTitleHeight,
  COLOR_3,
  COLOR_1,
  COLOR_LIGHT,
  COLOR_CREAM,
} from '../../common/constants';
import { DocumentRenderer } from '../DocumentRenderer';
import { OpenDocument } from '../../core/Document';
import { Context} from './Context';
import { TextAlign } from '../../core/Appearance';
import { Sheet } from '../../core/Sheet';
import { Point } from '@/lib/rendering/canvas/Point';


export class CanvasRenderer implements DocumentRenderer {

  public get Element(): HTMLElement {
    return this.container;
  }

  public width!: number;
  public height!: number;
  private canvas!: HTMLCanvasElement;
  private rendering: boolean = false;
  private renderFrameRate: number = 10; // FPS
  private context!: Context;


  public constructor(private container: HTMLElement, private document: OpenDocument) {
    this.initialize();
    document.addOnChange(() => this.render());
  }

  public initialize() {
    this.createElements();
    this.resize();
    this.render();
  }

  public createElements() {
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
  }

  public resize() {
    const pixelRatio = window.devicePixelRatio;
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

  public get_context2D() {
    const pixelRatio = window.devicePixelRatio;
    this.canvas.width = this.canvas.width;
    const context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    context.scale(pixelRatio, pixelRatio);
    return context;
  }

  public render() {
    if (this.rendering) {
      return;
    }

    this.rendering = true;
    setTimeout(() => {
      this.doRender();
      this.rendering = false;
    }, 1000 / this.renderFrameRate);

  }

  public doRender() {
    console.log('%cRender', `color:${COLOR_1}`);
    const context2d = this.get_context2D();
    this.context = new Context(context2d, this.width, this.height);
    this.renderSheetTitles();
    this.renderSheet();
  }

  private renderTopCorner() {
    this.context.fillStyle = '#ececec';
    this.context.fontSize = 12;
    const cornerWidth = RowHeaderWidth - 2;
    this.context.fillClosePath(new Point(2, cornerWidth), new Point(cornerWidth, cornerWidth), new Point(cornerWidth, 1));

  }

  private renderSheetTitles() {
    this.renderTopCorner();

    this.context.strokeSize = 1;
    const x1 = 0;
    const y1 = this.height - SheetTitleHeight - .5;
    const rHeight = SheetTitleHeight + 5;
    const h = this.height - SheetTitleHeight - 0.5;
    this.context.rect(x1, y1, this.width, rHeight);
    this.context.fillStyle = this.context.createGradient(0, h, 0, SheetTitleHeight / 3, [0, '#f0f0f0'], [1, '#fff']);
    this.context.fillRect(x1, y1, this.width, rHeight);
    this.context.textAlign = TextAlign.Center;

    let x = RowHeaderWidth;
    const active = this.document.ActiveSheet;
    const delta = 5;
    for (const sh of this.document.Sheets) {
      const sheetWidth = sh.getWidth((str) => this.context.get_textWidth(str));
      this.context.strokeStyle = '#aaa';
      this.context.fillStyle = '#fafafa';
      this.context.fontStyle = 'italic';
      if (sh === active) {
        this.context.fillStyle = '#fff';
        this.context.fontStyle = 'bold';
      }
      this.context.rect(x, h, sheetWidth, SheetTitleHeight - delta);
      this.context.fillText(sh.title, x, h + delta, sheetWidth);
      if (sh === active) {
        this.context.fillStyle = COLOR_3;
        this.context.fillRect(x, h + SheetTitleHeight - delta, sheetWidth, 2);
        this.context.strokeStyle = COLOR_LIGHT;
      }
      this.context.line(x, h, x + sheetWidth, h);

      x += sheetWidth + delta;
    }
    this.context.fontStyle = '';
  }

  private renderSheet() {
    const width = this.width;
    const height = this.height;

    const sheetTitleHeight = SheetTitleHeight;
    const maskHeight = height - sheetTitleHeight;
    const context = this.context;

    context.setMask(0, 0, width, height - (sheetTitleHeight + 1.5));
    const lastRow = this.renderRows();
    const lastColumn = this.renderColumns();
    context.unmask();

    context.setMask(ColumnHeaderHeight + .5, RowHeaderWidth, width, maskHeight - RowHeaderWidth - .5);
    this.renderCells(lastColumn, lastRow);
    context.unmask();
  }

  private renderRows() {
    const context = this.context;
    const height = this.height - RowHeaderWidth - SheetTitleHeight;
    let cumulativeHeight = RowDefaultHeight;
    const sheet = this.document.ActiveSheet;

    let rw = sheet.scrollRow;
    for (; cumulativeHeight < height; rw++) {
      const rowHeight = sheet.getRowHeight(rw);
      this.paintRow(cumulativeHeight, (rw + 1).toString());
      cumulativeHeight += rowHeight;
    }

    return rw;
  }

  private paintRow(top: number, label: string): any {
    const context = this.context;
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

  private renderColumns() {
    const width = this.width;
    const sheet = this.document.ActiveSheet;
    let cumulativeWidth = RowHeaderWidth + .5;
    let cl = sheet.scrollColumn;

    for (; cumulativeWidth <= width; cl++) {
      const columnWidth = sheet.getColumnWidth(cl);
      this.paintColumn(cumulativeWidth, Sheet.get_columnName(cl), columnWidth);
      cumulativeWidth += columnWidth;
    }
    return cl;
  }

  private paintColumn(left: number, label: string, columnWidth: number) {
    const context = this.context;
    context.strokeSize = 1;
    context.strokeStyle = '#ccc';
    context.fillStyle = '#fafafa';
    context.fontName = 'Tahoma';
    context.fontSize = 12;
    context.rect(left, 0, this.width, ColumnHeaderHeight - 1);
    context.fillRect(left, 0, this.width, ColumnHeaderHeight - 1);
    context.fillText(label, left, 7, columnWidth);
  }

  private renderCells(lastColumn: number, lastRow: number) {
    let x: number = 0;
    let y: number = 0;

    const sheet = this.document.ActiveSheet;
    const cellsToPaint = [];
    const context = this.context;
    context.strokeStyle = '#eee';
    context.strokeSize = 1;
    for (let r = sheet.scrollRow - 1; r < lastRow; r++) {
      const rowHeight = sheet.getRowHeight(r);
      x = 0;
      for (let c = sheet.scrollColumn; c <= lastColumn; c++) {
        const columnWidth = sheet.getColumnWidth(c);
        const cell = sheet.getCell(c, r);
        const cellHeight = cell ? sheet.getCellHeight(cell) : sheet.getRowHeight(r);
        const cellWidth = cell ? sheet.getCellWidth(cell) : sheet.getColumnWidth(c);
        const appearance = sheet.getAppearance(c, r);
        context.fillStyle = appearance.text;
        this.paintCell(c, r, x, y);

        if (y > 0 && (!cell || !cell.isMerged)) {
          const horStyle = appearance.horizontalBorder;
          const verStyle = appearance.verticalBorder;

          context.strokeStyle = (horStyle && horStyle.color) || '#eeeeee';
          if (appearance.background == null || horStyle != null) {
            context.line(x + RowHeaderWidth, y + cellHeight, x + RowHeaderWidth + cellWidth, y + cellHeight);
          }
          context.strokeStyle = (verStyle && verStyle.color) || '#eeeeee';
          if (appearance.background == null || verStyle != null) {
            context.line(x + RowHeaderWidth + cellWidth, y, x + RowHeaderWidth + cellWidth, y + cellHeight);
          }
        }
        x += columnWidth;
      }
      y += rowHeight;
    }
  }

  private paintCell(columnId: number, rowId: number, x: number, y: number) {
    const context = this.context;
    const sheet = this.document.ActiveSheet;
    const cell = sheet.getCell(columnId, rowId);
    if (cell && cell.isMerged) { return; }

    const appearance = sheet.getAppearance(columnId, rowId);
    const left = x + ColumnHeaderHeight;
    if (y < RowDefaultHeight) { return; }

    if (appearance.fontSize) { context.fontSize = parseInt(appearance.fontSize + ''); }
    if (appearance.fontName) { context.fontName = appearance.fontName; }
    context.fontStyle = (appearance.textStyle) ? appearance.textStyle : '';

    const cellWidth = cell ? sheet.getCellWidth(cell) : sheet.getColumnWidth(columnId);
    const cellHeight = cell ? sheet.getCellHeight(cell) : sheet.getRowHeight(rowId);

    context.setMask(left, y, cellWidth, cellHeight);
    if (appearance.background) {
      context.fillStyle = appearance.background;
      context.fillRect(left, y, cellWidth, cellHeight);
    }
    if (cell && cell.label) {
      context.contentFillStyle = appearance.text;
      context.strokeStyle = appearance.text;
      context.textAlign = appearance.textAlign;
      context.fillText(cell.label, x + ColumnHeaderHeight + 5, y + 7, cellWidth);
    }
    context.unmask();
  }

}
