var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './UIHandler', '../common/constants'], function (require, exports, UIHandler_1, constants_1) {
    var WebSheetUIHandler = (function (_super) {
        __extends(WebSheetUIHandler, _super);
        function WebSheetUIHandler() {
            _super.apply(this, arguments);
        }
        WebSheetUIHandler.prototype.mouseUp = function (x, y) {
            if (y < this.controller.renderer.Element.clientHeight - constants_1.SheetTitleHeight) {
                return;
            }
            var j = Math.floor((x - constants_1.RowHeaderWidth) / (constants_1.SheetTitleWidth + 5));
            var n = (x - constants_1.RowHeaderWidth) % (constants_1.SheetTitleWidth + 5);
            if (n < constants_1.SheetTitleWidth && j < this.controller.websheet.Sheets.length) {
                this.controller.changeActiveSheet(j);
            }
        };
        return WebSheetUIHandler;
    })(UIHandler_1.UIHandler);
    exports.WebSheetUIHandler = WebSheetUIHandler;
});
