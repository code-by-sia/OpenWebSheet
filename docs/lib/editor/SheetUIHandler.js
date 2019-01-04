var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./UIHandler", "../common/constants"], function (require, exports, UIHandler_1, constants_1) {
    var SheetUIHandler = (function (_super) {
        __extends(SheetUIHandler, _super);
        function SheetUIHandler() {
            _super.apply(this, arguments);
            this.wheelDeltaX = 0;
            this.wheelDeltaY = 0;
        }
        SheetUIHandler.prototype.mouseWheel = function (dx, dy) {
            this.wheelDeltaX += dx;
            this.wheelDeltaY += dy;
            var websheet = this.controller.websheet;
            var sheet = websheet.ActiveSheet;
            var delta = 120;
            if (this.wheelDeltaX > delta) {
                sheet.scrollRight();
                this.wheelDeltaX = 0;
            }
            else if (this.wheelDeltaX < -delta) {
                sheet.scrollLeft();
                this.wheelDeltaX = 0;
            }
            if (this.wheelDeltaY > delta) {
                sheet.scrollUp();
                this.wheelDeltaY = 0;
            }
            else if (this.wheelDeltaY < -delta) {
                sheet.scrollDown();
                this.wheelDeltaY = 0;
            }
            this.controller.renderer.render();
            this.controller.cellEditor.select();
        };
        SheetUIHandler.prototype.mouseDown = function (x, y) {
            this.oldX = x;
            this.oldY = y;
        };
        SheetUIHandler.prototype.mouseUp = function (x, y) {
            this.selectCell(x, y);
        };
        SheetUIHandler.prototype.keyPress = function (evt) {
        };
        SheetUIHandler.prototype.selectCell = function (x, y) {
            if (y < constants_1.ColumnHeaderHeight || x < constants_1.RowHeaderWidth) {
                return;
            }
            if (y > this.controller.renderer.Element.clientHeight - constants_1.SheetTitleHeight) {
                return;
            }
            var sheet = this.controller.websheet.ActiveSheet;
            var x1 = this.oldX - constants_1.RowHeaderWidth;
            var y1 = this.oldY - constants_1.ColumnHeaderHeight;
            var x2 = x - constants_1.RowHeaderWidth;
            var y2 = y - constants_1.ColumnHeaderHeight;
            this.controller.cellEditor.deselect();
            sheet.selectByXY(x1, y1, x2, y2);
            this.controller.cellEditor.select(true);
        };
        return SheetUIHandler;
    })(UIHandler_1.UIHandler);
    exports.SheetUIHandler = SheetUIHandler;
});
