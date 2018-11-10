define(["require", "exports"], function (require, exports) {
    (function (TextAlign) {
        TextAlign[TextAlign["Left"] = 0] = "Left";
        TextAlign[TextAlign["Right"] = 1] = "Right";
        TextAlign[TextAlign["Center"] = 2] = "Center";
    })(exports.TextAlign || (exports.TextAlign = {}));
    var TextAlign = exports.TextAlign;
    (function (BorderStyle) {
        BorderStyle[BorderStyle["SolidThin"] = 0] = "SolidThin";
        BorderStyle[BorderStyle["SolidThick"] = 1] = "SolidThick";
        BorderStyle[BorderStyle["SolidDouble"] = 2] = "SolidDouble";
        BorderStyle[BorderStyle["DottedThin"] = 3] = "DottedThin";
        BorderStyle[BorderStyle["DottedThick"] = 4] = "DottedThick";
        BorderStyle[BorderStyle["DashedThin"] = 5] = "DashedThin";
        BorderStyle[BorderStyle["DashedThick"] = 6] = "DashedThick";
        BorderStyle[BorderStyle["DotDashedThin"] = 7] = "DotDashedThin";
        BorderStyle[BorderStyle["DotDashedThick"] = 8] = "DotDashedThick";
    })(exports.BorderStyle || (exports.BorderStyle = {}));
    var BorderStyle = exports.BorderStyle;
    var Border = (function () {
        function Border(color) {
            if (color === void 0) { color = null; }
            this.color = color;
            this.style = BorderStyle.SolidThin;
        }
        Border.from = function (data) {
            var border = new Border();
            border.style = data.style;
            border.color = data.color;
            return border;
        };
        return Border;
    })();
    exports.Border = Border;
    var Appearance = (function () {
        function Appearance() {
            this.textAlign = TextAlign.Left;
            this.background = 'transparent';
        }
        Object.defineProperty(Appearance.prototype, "bold", {
            get: function () {
                return !!(this.textStyle && this.textStyle.indexOf('bold') != -1);
            },
            set: function (value) {
                this.ensureTextStyle();
                if (this.bold == value)
                    return;
                if (value)
                    this.textStyle = this.textStyle + " bold";
                else
                    this.textStyle = this.textStyle.replace('bold', '');
            },
            enumerable: true,
            configurable: true
        });
        Appearance.prototype.ensureTextStyle = function () {
            if (!this.textStyle) {
                this.textStyle = '';
            }
        };
        Object.defineProperty(Appearance.prototype, "italic", {
            get: function () {
                return !!(this.textStyle && this.textStyle.indexOf('italic') != -1);
            },
            set: function (value) {
                this.ensureTextStyle();
                if (this.italic == value || !this.textStyle)
                    return;
                if (value)
                    this.textStyle = this.textStyle + " italic";
                else
                    this.textStyle = this.textStyle.replace('italic', '');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Appearance.prototype, "underline", {
            get: function () {
                return !!(this.textStyle && this.textStyle.indexOf('underline') != -1);
            },
            set: function (value) {
                this.ensureTextStyle();
                if (this.italic == value || !this.textStyle)
                    return;
                if (value)
                    this.textStyle = this.textStyle + " underline";
                else
                    this.textStyle = this.textStyle.replace('underline', '');
            },
            enumerable: true,
            configurable: true
        });
        Appearance.prototype.alignTextTo = function (value) {
            if (value.toLowerCase() == "right") {
                this.textAlign = TextAlign.Right;
            }
            else if (value.toLowerCase() == "center") {
                this.textAlign = TextAlign.Center;
            }
            else if (value.toLowerCase() == "left") {
                this.textAlign = TextAlign.Left;
            }
            else {
                throw "invalid text-align '" + value + "'";
            }
        };
        Appearance.prototype.setHorizontal = function (value) {
            this.horizontalBorder = new Border();
            this.horizontalBorder.style = BorderStyle.SolidThin;
            this.horizontalBorder.color = value;
        };
        Appearance.prototype.setVertical = function (value) {
            this.verticalBorder = new Border();
            this.verticalBorder.style = BorderStyle.SolidThin;
            this.verticalBorder.color = value;
        };
        Appearance.from = function (data) {
            var app = new Appearance();
            app.textAlign = data.textAlign;
            app.textStyle = data.textStyle;
            app.fontName = data.fontName;
            app.fontSize = data.fontSize;
            app.text = data.text;
            app.background = data.background;
            app.horizontalBorder = data.horizontalBorder && Border.from(data.horizontalBorder);
            app.verticalBorder = data.verticalBorder && Border.from(data.verticalBorder);
            return app;
        };
        return Appearance;
    })();
    exports.Appearance = Appearance;
});
