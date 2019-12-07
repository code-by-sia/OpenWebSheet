import { UIHandler } from "./UIHandler";
import { RowHeaderWidth, ColumnHeaderHeight } from "../common/constants";

const delta = 4;

export class ResizeHandler extends UIHandler {

  private col: any;
  private row: any;
  private oldX!: number;
  private oldY!: number;
  private engaged = false;

  mouseMove(x: number, y: number) {
    const c = this.hitColumn(x - RowHeaderWidth, y);
    const r = this.hitRow(x, y - ColumnHeaderHeight);
    if (c !== false) {
      this.controller.changeCursor('col-resize');
    } else if (r !== false) {
      this.controller.changeCursor('row-resize');
    } else if (!this.engaged) {
      this.controller.resetCursor();
    }
  }

  mouseDown(x: number, y: number) {
    this.col = this.hitColumn(x - RowHeaderWidth, y);
    this.row = this.hitRow(x, y - ColumnHeaderHeight);
    this.oldX = x;
    this.oldY = y;
    if (this.col !== false || this.row !== false) {
      this.lock();

      if (this.col !== false) {
        this.controller.changeCursor('col-resize');
      } else if (this.row !== false) {
        this.controller.changeCursor('row-resize');
      }
      this.engaged = true;
    } else {
      this.engaged = false;
    }
  }

  mouseUp(x: number, y: number) {
    if (!this.engaged) return;
    if (this.col !== false) {
      this.controller.alterColumn(this.col, x - this.oldX);
      this.controller.resetCursor();
    }

    if (this.row !== false) {
      this.controller.alterRow(this.row, y - this.oldY);
      this.controller.resetCursor();
    }

    this.unlock();
  }

  private hitRow(x: number, y: number): any {
    if (x > RowHeaderWidth) return false;
    const rowH = (r: any) => this.controller.websheet.ActiveSheet.getRowHeight(r);
    let j = 0;
    for (let i = rowH(j++); i < y + delta; i += rowH(j++)) {
      if ((y > (i - delta)) && (y < (i + delta))) {
        return j - 1;
      }
    }

    return false;
  }

  private hitColumn(x: number, y: number): any {
    if (y > ColumnHeaderHeight) return false;
    const colW = (c: any) => this.controller.websheet.ActiveSheet.getColumnWidth(c);
    let j = 0;
    for (let i = colW(j++); i < x + delta; i += colW(j++)) {
      if ((x > (i - delta)) && (x < (i + delta))) {
        return j - 1;
      }
    }

    return false;
  }
}
