define(["require", "exports", './core/Document', './rendering/canvas/CanvasRendering', './editor/UIHandlerControler'], function (require, exports, Document_1, CanvasRendering_1, UIHandlerControler_1) {
    var UI = (function () {
        function UI(element) {
            var _this = this;
            this.element = element;
            this.handlers = [];
            this.document = new Document_1.OpenDocument();
            this.render = null;
            this.render = new CanvasRendering_1.CanvasRenderer(element, this.document);
            this.uiController = new UIHandlerControler_1.UIHandlerController(this.document, this.render);
            this.document.addOnChange(function () { return _this.raiseOnChangeEventListener(); });
            this.render.render();
            element['openDocument'] = this.document;
        }
        Object.defineProperty(UI.prototype, "isMerged", {
            get: function () {
                var cell = this.selectedCell;
                if (!cell)
                    return;
                return (cell.colSpan > 1) || (cell.rowSpan > 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UI.prototype, "selectedCell", {
            get: function () {
                return this.document.ActiveSheet.selectedCell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UI.prototype, "SelectedCellLabel", {
            get: function () {
                return this.document.ActiveSheet.SelectionLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UI.prototype, "SelectedValue", {
            get: function () {
                return this.document.ActiveSheet.SelectedValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UI.prototype, "SelectedAppearance", {
            get: function () {
                return this.document.ActiveSheet.SelectedAppearance;
            },
            enumerable: true,
            configurable: true
        });
        UI.prototype.execCmd = function (cmd) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            console.log("the command _" + cmd + "_ executed.");
            (_a = this.document).execCommand.apply(_a, [cmd].concat(args));
            var _a;
        };
        UI.prototype.addOnChangeEventListener = function (handler) {
            this.handlers.push(handler);
        };
        UI.prototype.removeOnChangeEventListener = function (handler) {
            var ix = this.handlers.indexOf(handler);
            if (ix != -1) {
                this.handlers.splice(ix, 1);
            }
        };
        UI.prototype.raiseOnChangeEventListener = function () {
            var _this = this;
            this.handlers.forEach(function (handler) { return handler(_this.document); });
        };
        return UI;
    })();
    exports.UI = UI;
});
