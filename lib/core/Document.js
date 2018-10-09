define(["require", "exports", './Sheet'], function (require, exports, Sheet_1) {
    var OpenDocument = (function () {
        function OpenDocument() {
            this.sheets = [];
            this.activeSheetIndex = 0;
            this.init();
        }
        OpenDocument.prototype.init = function () {
            this.sheets.push(new Sheet_1.Sheet("Sheet1"));
            this.sheets.push(new Sheet_1.Sheet("Sheet2"));
            this.sheets.push(new Sheet_1.Sheet("Sheet3"));
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
        return OpenDocument;
    })();
    exports.OpenDocument = OpenDocument;
});
