import { UIHandler } from "./UIHandler";
import { ColumnHeaderHeight, RowHeaderWidth, SheetTitleHeight } from "../common/constants";

export class SheetUIHandler extends UIHandler {

    private  wheelDeltaX:number = 0;
    private  wheelDeltaY:number = 0;

    private oldX;
    private oldY;

    mouseWheel(dx, dy) {

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
        this.controller.cellEditor.select();

    }

    mouseDown(x, y) {
        this.oldX = x;
        this.oldY = y;
    }

    mouseUp(x, y) {
        this.selectCell(x, y);
    }

    keyPress(evt){
        
    }

    private selectCell(x, y) {
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
        this.controller.cellEditor.deselect();
        sheet.selectByXY(x1, y1, x2, y2);
        this.controller.cellEditor.select(false);
    }

}
