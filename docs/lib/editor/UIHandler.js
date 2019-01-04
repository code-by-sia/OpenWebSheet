///<reference path="../core/Sheet.ts"/>
///<reference path="../jquery.d.ts"/>
///<reference path="./CellEditor.ts"/>
define(["require", "exports"], function (require, exports) {
    var UIHandler = (function () {
        function UIHandler(controller) {
            this.controller = controller;
        }
        UIHandler.prototype.click = function () { };
        UIHandler.prototype.dblClick = function () { };
        UIHandler.prototype.mouseDown = function (x, y) { };
        UIHandler.prototype.mouseMove = function (x, y) { };
        UIHandler.prototype.mouseUp = function (x, y) { };
        UIHandler.prototype.mouseWheel = function (dx, dy) { };
        UIHandler.prototype.keyDown = function (evt) { };
        UIHandler.prototype.keyPress = function (evt) { };
        UIHandler.prototype.keyUp = function (evt) { };
        Object.defineProperty(UIHandler.prototype, "locked", {
            get: function () {
                return this.controller.locked;
            },
            enumerable: true,
            configurable: true
        });
        UIHandler.prototype.lock = function () {
            this.controller.lock(this);
        };
        UIHandler.prototype.unlock = function () {
            this.controller.unlock();
        };
        return UIHandler;
    })();
    exports.UIHandler = UIHandler;
});
