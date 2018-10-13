define(["require", "exports", "./CellEditor", "./DocumentHandler", "./SheetUIHandler"], function (require, exports, CellEditor_1, DocumentHandler_1, SheetUIHandler_1) {
    var UIHandlerController = (function () {
        function UIHandlerController(websheet, renderer) {
            var _this = this;
            this.websheet = websheet;
            this.renderer = renderer;
            this.handlers = [];
            this.cellEditor = new CellEditor_1.CellEditor(this);
            this.addHandlers();
            this.attachEvents();
            websheet.addOnChange(function () { return _this.cellEditor.updateEitorAppearance(); });
        }
        UIHandlerController.prototype.addHandlers = function () {
            this.handlers.push(new DocumentHandler_1.WebSheetUIHandler(this));
            this.handlers.push(new SheetUIHandler_1.SheetUIHandler(this));
        };
        UIHandlerController.prototype.attachEvents = function () {
            var _this = this;
            var element = this.renderer.Element;
            var overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.zIndex = '9999';
            element.appendChild(overlay);
            var controler = this;
            var getXY = function (evt) {
                var x = evt.offsetX || evt.layerX || (evt.clientX - element.offsetLeft);
                var y = evt.offsetY || evt.layerY || (evt.clientY - element.offsetTop);
                return { 'x': x, 'y': y };
            };
            $(overlay)
                .mousedown(function (evt) {
                var pos = getXY(evt);
                controler.mouseDown(pos.x, pos.y);
            })
                .mousemove(function (evt) {
                var pos = getXY(evt);
                controler.mouseMove(pos.x, pos.y);
            })
                .mouseup(function (evt) {
                var pos = getXY(evt);
                controler.mouseUp(pos.x, pos.y);
            })
                .click(function (evt) {
                controler.click();
            })
                .dblclick(function (evt) {
                controler.dblClick();
            })
                .bind('mousewheel', function (evtE) {
                var evt = evtE;
                var dx = evt.originalEvent.wheelDeltaX;
                var dy = evt.originalEvent.wheelDeltaY;
                controler.mouseWheel(dx, dy);
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            })
                .keydown(function (evt) {
                controler.keyDown(evt.originalEvent);
            })
                .keypress(function (evt) {
                controler.keyPress(evt.originalEvent);
            })
                .keyup(function (evt) {
                controler.keyUp(evt.originalEvent);
            });
            $(window).resize(function () { return _this.renderer.resize(); });
        };
        UIHandlerController.prototype.click = function () {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].click();
            }
        };
        UIHandlerController.prototype.dblClick = function () {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].dblClick();
            }
        };
        UIHandlerController.prototype.mouseDown = function (x, y) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].mouseDown(x, y);
            }
        };
        UIHandlerController.prototype.mouseMove = function (x, y) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].mouseMove(x, y);
            }
        };
        UIHandlerController.prototype.mouseUp = function (x, y) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].mouseUp(x, y);
            }
        };
        UIHandlerController.prototype.mouseWheel = function (dx, dy) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].mouseWheel(dx, dy);
            }
        };
        UIHandlerController.prototype.keyDown = function (evt) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].keyDown(evt);
            }
        };
        UIHandlerController.prototype.keyPress = function (evt) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].keyPress(evt);
            }
        };
        UIHandlerController.prototype.keyUp = function (evt) {
            for (var i = 0; i < this.handlers.length; i++) {
                this.handlers[i].keyUp(evt);
            }
        };
        return UIHandlerController;
    })();
    exports.UIHandlerController = UIHandlerController;
});
