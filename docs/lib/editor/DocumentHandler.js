var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./UIHandler", "../common/constants"], function (require, exports, UIHandler_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebSheetUIHandler = /** @class */ (function (_super) {
        __extends(WebSheetUIHandler, _super);
        function WebSheetUIHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(UIHandler_1.UIHandler));
    exports.WebSheetUIHandler = WebSheetUIHandler;
});
