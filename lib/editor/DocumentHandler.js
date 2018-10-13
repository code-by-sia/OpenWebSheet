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
            x = x - constants_1.RowHeaderWidth;
            var sheets = this.controller.websheet.Sheets;
            var tx = 0;
            for (var i = 0; i < sheets.length; i++) {
                var sheet = sheets[i];
                var min = tx;
                var max = tx + constants_1.SheetTitleWidth + 5;
                if (x > min && x < max) {
                    this.controller.cellEditor.deselect();
                    this.controller.websheet.ActiveSheetIndex = i;
                    this.controller.cellEditor.select(false);
                    break;
                }
                tx += constants_1.SheetTitleWidth;
            }
        };
        return WebSheetUIHandler;
    })(UIHandler_1.UIHandler);
    exports.WebSheetUIHandler = WebSheetUIHandler;
});
