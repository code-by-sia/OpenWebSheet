define(["require", "exports", './core/Document', './rendering/canvas/CanvasRendering', './editor/UIHandlerControler'], function (require, exports, Document_1, CanvasRendering_1, UIHandlerControler_1) {
    var UI = (function () {
        function UI(element) {
            this.element = element;
            this.document = new Document_1.OpenDocument();
            this.render = null;
            this.render = new CanvasRendering_1.CanvasRenderer(element, this.document);
            this.uiController = new UIHandlerControler_1.UIHandlerController(this.document, this.render);
            this.render.render();
            element['openDocument'] = this.document;
        }
        UI.prototype.execCmd = function (cmd) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = this.document).execCommand.apply(_a, [cmd].concat(args));
            var _a;
        };
        return UI;
    })();
    exports.UI = UI;
});
