var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./UIHandler", "../common/constants"], function (require, exports, UIHandler_1, constants_1) {
    var delta = 4;
    var ResizeHandler = (function (_super) {
        __extends(ResizeHandler, _super);
        function ResizeHandler() {
            _super.apply(this, arguments);
            this.engaged = false;
        }
        ResizeHandler.prototype.mouseMove = function (x, y) {
            var c = this.hitColumn(x - constants_1.RowHeaderWidth, y);
            var r = this.hitRow(x, y - constants_1.ColumnHeaderHeight);
            if (c !== false) {
                this.controller.changeCursor('col-resize');
            }
            else if (r !== false) {
                this.controller.changeCursor('row-resize');
            }
            else if (!this.engaged) {
                this.controller.resetCursor();
            }
        };
        ResizeHandler.prototype.mouseDown = function (x, y) {
            this.col = this.hitColumn(x - constants_1.RowHeaderWidth, y);
            this.row = this.hitRow(x, y - constants_1.ColumnHeaderHeight);
            this.oldX = x;
            this.oldY = y;
            if (this.col !== false || this.row !== false) {
                this.lock();
                if (this.col !== false) {
                    this.controller.changeCursor('col-resize');
                }
                else if (this.row !== false) {
                    this.controller.changeCursor('row-resize');
                }
                this.engaged = true;
            }
            else {
                this.engaged = false;
            }
        };
        ResizeHandler.prototype.mouseUp = function (x, y) {
            if (!this.engaged)
                return;
            if (this.col !== false) {
                this.controller.alterColumn(this.col, x - this.oldX);
                this.controller.resetCursor();
            }
            if (this.row !== false) {
                this.controller.alterRow(this.row, y - this.oldY);
                this.controller.resetCursor();
            }
            this.unlock();
        };
        ResizeHandler.prototype.hitRow = function (x, y) {
            var _this = this;
            if (x > constants_1.RowHeaderWidth)
                return false;
            var rowH = function (r) { return _this.controller.websheet.ActiveSheet.getRowHeight(r); };
            var j = 0;
            for (var i = rowH(j++); i < y + delta; i += rowH(j++)) {
                if ((y > (i - delta)) && (y < (i + delta))) {
                    return j - 1;
                }
            }
            return false;
        };
        ResizeHandler.prototype.hitColumn = function (x, y) {
            var _this = this;
            if (y > constants_1.ColumnHeaderHeight)
                return false;
            var colW = function (c) { return _this.controller.websheet.ActiveSheet.getColumnWidth(c); };
            var j = 0;
            for (var i = colW(j++); i < x + delta; i += colW(j++)) {
                if ((x > (i - delta)) && (x < (i + delta))) {
                    return j - 1;
                }
            }
            return false;
        };
        return ResizeHandler;
    })(UIHandler_1.UIHandler);
    exports.ResizeHandler = ResizeHandler;
});
