define(["require", "exports", "../../core/Appearance"], function (require, exports, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by SiamandM on 6/16/2016.
     */
    var LayoutDirection;
    (function (LayoutDirection) {
        LayoutDirection[LayoutDirection["LeftToRight"] = 1] = "LeftToRight";
        LayoutDirection[LayoutDirection["RightToLeft"] = 2] = "RightToLeft";
    })(LayoutDirection = exports.LayoutDirection || (exports.LayoutDirection = {}));
    var Point = /** @class */ (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    exports.Point = Point;
    var ContextMask = /** @class */ (function () {
        function ContextMask(left, top, width, height) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.x = left;
            this.y = top;
            this.width = width;
            this.height = height;
        }
        ContextMask.prototype.get_left = function () {
            return this.x;
        };
        ContextMask.prototype.set_left = function (value) {
            this.x = value;
        };
        ContextMask.prototype.get_top = function () {
            return this.y;
        };
        ContextMask.prototype.get_right = function () {
            return this.x + this.width;
        };
        ContextMask.prototype.get_bottom = function () {
            return this.y + this.height;
        };
        ContextMask.prototype.set_top = function (value) {
            this.y = value;
        };
        ContextMask.prototype.get_width = function () {
            return this.width;
        };
        ContextMask.prototype.set_width = function (value) {
            this.width = value;
        };
        ContextMask.prototype.get_height = function () {
            return this.height;
        };
        ContextMask.prototype.set_height = function (value) {
            this.height = value;
        };
        ContextMask.prototype.set_value = function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        };
        ContextMask.prototype.get_combinedMask = function (x, y, w, h) {
            var x2 = Math.min(x + w, this.get_right());
            var y2 = Math.min(y + h, this.get_bottom());
            w = Math.min(x2 - x, this.get_width());
            h = Math.min(y2 - y, this.get_height());
            x = Math.max(x, this.get_left());
            y = Math.max(y, this.get_top());
            return new ContextMask(x, y, w, h);
        };
        return ContextMask;
    }());
    exports.ContextMask = ContextMask;
    var Context = /** @class */ (function () {
        function Context(context, width, height) {
            this.maskStack = [];
            this.direction = LayoutDirection.LeftToRight;
            this.textAlign = Appearance_1.TextAlign.Left;
            this.fillStyle = '#fff';
            this.strokeStyle = '#000';
            this.strokeSize = 1;
            this.contentFillStyle = '#000';
            this.fontStyle = "";
            this.fontSize = 12;
            this.fontName = "Tahoma";
            this.context2d = context;
            this.width = width;
            this.height = height;
        }
        Context.prototype.applyFill = function () {
            this.context2d.fillStyle = this.fillStyle;
        };
        Context.prototype.applyStroke = function () {
            this.context2d.strokeStyle = this.strokeStyle;
            this.context2d.lineWidth = this.strokeSize;
        };
        Context.prototype.applyContent = function () {
            var style = this.fontStyle.replace('underline', '');
            this.context2d.fillStyle = this.contentFillStyle;
            this.context2d.font = (this.fontStyle + " " + this.fontSize + "px " + this.fontName).trim();
            this.context2d.textAlign = 'left';
        };
        Context.prototype.get_directed_x = function (x, width) {
            if (width === void 0) { width = 0; }
            if (this.direction == LayoutDirection.LeftToRight)
                return x;
            return this.width - x - width;
        };
        Context.prototype.get_textWidth = function (text) {
            return this.context2d.measureText(text).width;
        };
        Context.prototype.save = function () {
            this.context2d.save();
            this.context2d.translate(-0.5, -0.5);
            if (this.currentMask) {
                var cmask = this.currentMask;
                this.context2d.rect(cmask.get_left(), cmask.get_top(), cmask.get_width(), cmask.get_height());
                this.context2d.clip();
            }
        };
        Context.prototype.restore = function () {
            this.context2d.restore();
        };
        Context.prototype.setMask = function (x, y, w, h, affectPreviousMask) {
            if (affectPreviousMask === void 0) { affectPreviousMask = false; }
            x = this.get_directed_x(x, w);
            if (this.currentMask) {
                this.maskStack.push(this.currentMask);
            }
            if (affectPreviousMask && this.currentMask) {
                this.currentMask = this.currentMask.get_combinedMask(x, y, w, h);
            }
            else {
                this.currentMask = new ContextMask(x, y, w, h);
            }
        };
        Context.prototype.unmask = function () {
            if (this.maskStack.length > 0) {
                this.currentMask = this.maskStack.pop();
            }
            else {
                this.currentMask = null;
            }
        };
        Context.prototype.clearRect = function (x, y, w, h) {
            x = this.get_directed_x(x, w);
            this.save();
            this.context2d.clearRect(x, y, w, h);
            this.restore();
        };
        Context.prototype.fillRect = function (x, y, w, h) {
            x = this.get_directed_x(x, w);
            this.save();
            this.applyFill();
            this.context2d.beginPath();
            this.context2d.fillRect(x, y, w, h);
            this.context2d.fill();
            this.restore();
        };
        Context.prototype.strokeRect = function (x, y, w, h) {
            x = this.get_directed_x(x, w);
            this.save();
            this.applyStroke();
            this.context2d.beginPath();
            this.context2d.strokeRect(x, y, w, h);
            this.context2d.stroke();
            this.restore();
        };
        Context.prototype.line = function (x1, y1, x2, y2) {
            x1 = this.get_directed_x(x1);
            x2 = this.get_directed_x(x2);
            this.save();
            this.applyStroke();
            this.context2d.beginPath();
            this.context2d.moveTo(x1, y1);
            this.context2d.lineTo(x2, y2);
            this.context2d.stroke();
            this.restore();
        };
        Context.prototype.internalPath = function (close, stroke, fill, points) {
            var args = [close, stroke, fill];
            for (var i = 0; i < points.length; i++)
                args.push(points[i]);
            this.path.apply(this, args);
        };
        Context.prototype.path = function (close, stroke, fill) {
            var points = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                points[_i - 3] = arguments[_i];
            }
            this.save();
            this.applyStroke();
            this.applyFill();
            this.context2d.beginPath();
            var point = points[0];
            var drpx = this.get_directed_x(point.x);
            this.context2d.moveTo(drpx, point.y);
            for (var i = 1; i < points.length; i++) {
                point = points[i];
                var drx = this.get_directed_x(point.x);
                this.context2d.lineTo(drx, point.y);
            }
            if (close) {
                this.context2d.closePath();
            }
            if (fill) {
                this.context2d.fill();
            }
            if (stroke) {
                this.context2d.stroke();
            }
            this.restore();
        };
        Context.prototype.openPath = function () {
            var points = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                points[_i] = arguments[_i];
            }
            this.internalPath(false, true, false, points);
        };
        Context.prototype.closePath = function () {
            var points = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                points[_i] = arguments[_i];
            }
            this.internalPath(true, true, false, points);
        };
        Context.prototype.fillOpenPath = function () {
            var points = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                points[_i] = arguments[_i];
            }
            this.internalPath(false, true, true, points);
        };
        Context.prototype.fillClosePath = function () {
            var points = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                points[_i] = arguments[_i];
            }
            this.internalPath(true, false, true, points);
        };
        Context.prototype.rect = function (x, y, w, h) {
            x = this.get_directed_x(x, w);
            this.fillRect(x, y, w, h);
            this.strokeRect(x, y, w, h);
        };
        Context.prototype.fillText = function (text, x, y, width) {
            x = this.get_directed_x(x, width);
            this.save();
            this.applyContent();
            var delta = 0;
            var textWidth = this.get_textWidth(text);
            if (this.textAlign == Appearance_1.TextAlign.Center) {
                delta = (width - textWidth) / 2;
            }
            else if (this.textAlign == Appearance_1.TextAlign.Right) {
                delta = width - textWidth - 10; //TODO: fix that constant value [indent]
            }
            if (this.fontStyle && this.fontStyle.indexOf('underline') != -1) {
                this.rect(x, y + this.fontSize + 2, this.context2d.measureText(text).width, 0);
            }
            this.context2d.fillText(text, x + delta, y + this.fontSize);
            this.restore();
        };
        Context.prototype.createGradient = function (x, y, w, h) {
            var stops = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                stops[_i - 4] = arguments[_i];
            }
            var grd = this.context2d.createLinearGradient(x, y, x + w, y + h);
            for (var _a = 0, stops_1 = stops; _a < stops_1.length; _a++) {
                var n = stops_1[_a];
                grd.addColorStop(n[0], n[1]);
            }
            return grd;
        };
        return Context;
    }());
    exports.Context = Context;
});
