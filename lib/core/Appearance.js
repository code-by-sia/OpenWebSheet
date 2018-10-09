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
        return Border;
    })();
    exports.Border = Border;
    var Appearance = (function () {
        function Appearance() {
            this.textAlign = TextAlign.Left;
        }
        return Appearance;
    })();
    exports.Appearance = Appearance;
});
