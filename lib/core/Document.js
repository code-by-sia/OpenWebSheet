define(["require", "exports", "./Sheet", "./Commander"], function (require, exports, Sheet_1, Commander_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenDocument = /** @class */ (function () {
        function OpenDocument() {
            this.sheets = [];
            this.activeSheetIndex = 0;
            this.change_listeners = [];
            this.init();
            this.commander = new Commander_1.Commander(this);
        }
        OpenDocument.prototype.init = function () {
            this.addSheet("Sheet1");
            this.addSheet("Sheet2");
            this.addSheet("Sheet3");
        };
        OpenDocument.prototype.addSheet = function (name) {
            var _this = this;
            var sheet = new Sheet_1.Sheet(name);
            sheet.addOnChange(function () { return _this.onChange(); });
            this.sheets.push(sheet);
            this.onChange();
        };
        Object.defineProperty(OpenDocument.prototype, "ActiveSheet", {
            get: function () {
                return this.sheets[this.activeSheetIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OpenDocument.prototype, "ActiveSheetIndex", {
            get: function () {
                return this.activeSheetIndex;
            },
            set: function (index) {
                if (index < 0 || index >= this.sheets.length) {
                    throw 'invalid sheet index';
                }
                this.activeSheetIndex = index;
                this.onChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OpenDocument.prototype, "Sheets", {
            get: function () {
                return this.sheets;
            },
            enumerable: true,
            configurable: true
        });
        OpenDocument.prototype.addOnChange = function (handler) {
            this.change_listeners.push(handler);
        };
        OpenDocument.prototype.removeOnChange = function (handler) {
            var ix = this.change_listeners.indexOf(handler);
            if (ix >= 0) {
                this.change_listeners.splice(ix, 1);
            }
        };
        OpenDocument.prototype.onChange = function () {
            this.change_listeners.forEach(function (m) { return m(); });
        };
        OpenDocument.prototype.execCommand = function (cmd) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = this.commander).do.apply(_a, [cmd].concat(args));
            var _a;
        };
        OpenDocument.prototype.save = function () {
            return {
                sheets: this.sheets.map(function (sh) { return sh.save(); }),
                activeSheetIndex: this.activeSheetIndex
            };
        };
        OpenDocument.prototype.load = function (obj) {
            this.sheets = obj.sheets.map(function (sh) { return Sheet_1.Sheet.load(sh); });
            this.activeSheetIndex = obj.activeSheetIndex;
            this.onChange();
        };
        return OpenDocument;
    }());
    exports.OpenDocument = OpenDocument;
});
