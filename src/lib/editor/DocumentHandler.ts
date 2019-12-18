import { UIHandler } from './UIHandler';
import { SheetTitleHeight, RowHeaderWidth, SheetTitleWidth } from '../common/constants';

export class WebSheetUIHandler extends UIHandler {

  public mouseUp(x: number, y: number) {
    if (y < this.controller.renderer.Element.clientHeight - SheetTitleHeight) {
      return;
    }

    const j = Math.floor((x - RowHeaderWidth) / (SheetTitleWidth + 5));
    const n = (x - RowHeaderWidth) % (SheetTitleWidth + 5);
    if (n < SheetTitleWidth && j < this.controller.websheet.Sheets.length) {
      this.controller.changeActiveSheet(j);
    }
  }


}
