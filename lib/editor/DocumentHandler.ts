
import {UIHandler} from './UIHandler';
import { SheetTitleHeight, RowHeaderWidth, SheetTitleWidth } from '../common/constants';

export class WebSheetUIHandler extends UIHandler {

    mouseUp(x, y) {
        if (y < this.controller.renderer.Element.clientHeight - SheetTitleHeight) {
            return;
        }

        x = x - RowHeaderWidth;

        let sheets = this.controller.websheet.Sheets;
        let tx = 0;
        for (let i = 0; i < sheets.length; i++) {
            let sheet = sheets[i];
            let min = tx;
            let max = tx + SheetTitleWidth + 5;

            if (x > min && x < max) {
                this.controller.cellEditor.deselect();
                this.controller.websheet.ActiveSheetIndex = i;
                this.controller.cellEditor.select(false);
                break;
            }
            tx += SheetTitleWidth;
        }
    }

}