import { UIHandler } from './UIHandler';
import { ColumnHeaderHeight, RowHeaderWidth, SheetTitleHeight } from '../common/constants';
import { UIHandlerController } from '@/lib/editor/UIHandlerControler';
import { Sheet } from '@/lib/core/Sheet';

export class SheetUIHandler extends UIHandler {

  private wheelDeltaX: number = 0;
  private wheelDeltaY: number = 0;

  private oldX!: number;
  private oldY!: number;
  private sheet: Sheet;

  constructor(controller: UIHandlerController) {
    super(controller);
    this.sheet = controller.websheet.ActiveSheet;
  }

  public mouseWheel(dx: number, dy: number) {

    this.wheelDeltaX += dx;
    this.wheelDeltaY += dy;

    const websheet = this.controller.websheet;
    const sheet = websheet.ActiveSheet;
    const delta = 120;

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

  public mouseDown(x: number, y: number) {
    this.oldX = x;
    this.oldY = y;
  }

  public mouseUp(x: number, y: number) {
    this.selectCell(x, y);
  }

  public keyPress(evt: KeyboardEvent) {
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

  public keyDown(evt: KeyboardEvent) {
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

  public dblClick() {
    if (!this.controller.EditMode) {
      this.controller.EditMode = true;
    }
  }

  private selectCell(x: number, y: number) {
    if (y < ColumnHeaderHeight || x < RowHeaderWidth) {
      return;
    }
    if (y > this.controller.renderer.Element.clientHeight - SheetTitleHeight) {
      return;
    }
    const sheet = this.controller.websheet.ActiveSheet;
    const x1 = this.oldX - RowHeaderWidth;
    const y1 = this.oldY - ColumnHeaderHeight;
    const x2 = x - RowHeaderWidth;
    const y2 = y - ColumnHeaderHeight;
    this.controller.deselect();
    sheet.selectByXY(x1, y1, x2, y2);
    this.controller.select(true);
  }

}
