define(["require", "exports"], function (require, exports) {
    var Cell = (function () {
        function Cell(columnId, rowId) {
            this.colSpan = 1;
            this.rowSpan = 1;
            this._value = null;
            this._columnId = columnId;
            this._rowId = rowId;
        }
        Object.defineProperty(Cell.prototype, "columnId", {
            get: function () {
                return this._columnId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "rowId", {
            get: function () {
                return this._rowId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "label", {
            get: function () {
                return this.formattedValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (newValue) {
                this.update(newValue, newValue);
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.update = function (newValue, evaluated) {
            this._value = newValue;
            this.evaluatedValue = evaluated;
            this.format();
        };
        Cell.prototype.format = function () {
            this.formattedValue = this.evaluatedValue;
        };
        return Cell;
    })();
    exports.Cell = Cell;
});
