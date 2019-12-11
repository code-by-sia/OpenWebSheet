import { UIHandler } from "./UIHandler";
import { ColumnHeaderHeight, RowHeaderWidth, SheetTitleHeight } from "../common/constants";
import { UIHandlerController } from "@/lib/editor/UIHandlerControler"
import { Sheet } from "@/lib/core/Sheet"

export class SheetUIHandler extends UIHandler {

  private wheelDeltaX: number = 0;
  private wheelDeltaY: number = 0;

  private oldX!: number;
  private oldY!: number;
  private sheet: Sheet

  constructor(controller: UIHandlerController) {
    super(controller);
    this.sheet = controller.websheet.ActiveSheet;
  }

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

  keyPress(evt: KeyboardEvent) {
    if (evt.key == 'Enter') {
      if (!this.controller.EditMode) {
        this.controller.EditMode = true;
        return;
      } else {
        this.controller.commit();
        this.controller.EditMode = false;
      }
      if (evt.shiftKey) {
        this.sheet.selectPreviousRowCell();
      } else {
        this.sheet.selectNextRowCell();
      }
    }
  }

  keyDown(evt: KeyboardEvent) {
    if (evt.key == 'Tab') {
      this.controller.deselect();
      if (evt.shiftKey) {
        this.sheet.selectPreviousColumnCell();
      } else {
        this.sheet.selectNextColumnCell();
      }
      evt.preventDefault();
      this.controller.select(true);
    }
    if (this.controller.EditMode) {
      return;
    }
    if (evt.key == 'ArrowRight' || evt.key == 'ArrowLeft' || evt.key == 'ArrowUp' || evt.key == 'ArrowDown') {
      this.controller.deselect();
      if (evt.key == 'ArrowRight') {
        this.sheet.selectNextColumnCell();
      } else if (evt.key == 'ArrowLeft') {
        this.sheet.selectPreviousColumnCell();
      } else if (evt.key == 'ArrowUp') {
        this.sheet.selectPreviousRowCell();
      } else if (evt.key == 'ArrowDown') {
        this.sheet.selectNextRowCell();
      }
      evt.preventDefault();
      this.controller.select(true);
    }
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
