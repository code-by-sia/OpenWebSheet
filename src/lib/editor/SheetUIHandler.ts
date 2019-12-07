import { UIHandler } from "./UIHandler";
import { ColumnHeaderHeight, RowHeaderWidth, SheetTitleHeight } from "../common/constants";

export class SheetUIHandler extends UIHandler {

  private wheelDeltaX: number = 0;
  private wheelDeltaY: number = 0;

  private oldX!: number;
  private oldY!: number;

  mouseWheel(dx: number, dy: number) {

    this.wheelDeltaX += dx;
    this.wheelDeltaY += dy;

    let websheet = this.controller.websheet;
    let sheet = websheet.ActiveSheet;
    let delta = 120;

    if (this.wheelDeltaX > delta) {
      sheet.scrollRight();
      this.wheelDeltaX = 0;
    } else if (this.wheelDeltaX < -delta) {
      sheet.scrollLeft();
      this.wheelDeltaX = 0;
    }

    if (this.wheelDeltaY > delta) {
      sheet.scrollUp();
      this.wheelDeltaY = 0;
    } else if (this.wheelDeltaY < -delta) {
      sheet.scrollDown();
      this.wheelDeltaY = 0;
    }
    this.controller.renderer.render();
    this.controller.select();

  }

  mouseDown(x: number, y: number) {
    this.oldX = x;
    this.oldY = y;
  }

  mouseUp(x: number, y: number) {
    this.selectCell(x, y);
  }

  keyPress(evt: any) {

  }

  private selectCell(x: number, y: number) {
    if (y < ColumnHeaderHeight || x < RowHeaderWidth) {
      return;
    }
    if (y > this.controller.renderer.Element.clientHeight - SheetTitleHeight) {
      return;
    }
    let sheet = this.controller.websheet.ActiveSheet;
    let x1 = this.oldX - RowHeaderWidth;
    let y1 = this.oldY - ColumnHeaderHeight;
    let x2 = x - RowHeaderWidth;
    let y2 = y - ColumnHeaderHeight;
    this.controller.deselect();
    sheet.selectByXY(x1, y1, x2, y2);
    this.controller.select(true);
  }

}
