
import {UIHandler} from './UIHandler';
import { SheetTitleHeight, RowHeaderWidth, SheetTitleWidth } from '../common/constants';

export class WebSheetUIHandler extends UIHandler {


    mouseUp(x, y) {
        if (y < this.controller.renderer.Element.clientHeight - SheetTitleHeight) {
            return;
        }


        let j = Math.floor((x - RowHeaderWidth) / (SheetTitleWidth + 5));
        let n = (x - RowHeaderWidth) % (SheetTitleWidth + 5);
        if (n < SheetTitleWidth && j < this.controller.websheet.Sheets.length) {
            this.controller.changeActiveSheet(j);
        }

    }

}