define(["require", "exports"], function (require, exports) {
    var Cell = (function () {
        function Cell(columnId, rowId) {
            this.colSpan = 1;
            this.rowSpan = 1;
            this._value = null;
            // merged cell has following value
            this.reference = null;
            this._columnId = columnId;
            this._rowId = rowId;
        }
        Object.defineProperty(Cell.prototype, "isMerged", {
            get: function () {
                return this.reference !== null;
            },
            enumerable: true,
            configurable: true
        });
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
        Object.defineProperty(Cell.prototype, "top", {
            get: function () {
                if (this.isMerged) {
                    return this.reference.top;
                }
                return this.rowId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "left", {
            get: function () {
                if (this.isMerged) {
                    return this.reference.left;
                }
                return this.columnId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "bottom", {
            get: function () {
                if (this.isMerged) {
                    return this.reference.bottom;
                }
                return this.rowId + this.rowSpan;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "right", {
            get: function () {
                if (this.isMerged) {
                    return this.reference.right;
                }
                return this.columnId + this.colSpan;
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
        Cell.from = function (data) {
            var cell = new Cell(data.columnId, data.rowId);
            cell.colSpan = data.colSpan;
            cell.rowSpan = data.rowSpan;
            cell.formattedValue = data.formattedValue;
            cell.evaluatedValue = data.evaluatedValue;
            cell._columnId = data._columnId;
            cell._rowId = data._rowId;
            cell._value = data._value;
            cell.reference = data.reference && this.from(data.reference);
            return cell;
        };
        Cell.prototype.to = function () {
            return {
                colSpan: this.colSpan,
                rowSpan: this.rowSpan,
                formattedValue: this.formattedValue,
                evaluatedValue: this.evaluatedValue,
                _columnId: this._columnId,
                _rowId: this._rowId,
                _value: this._value,
                reference: this.reference && this.reference.to()
            };
        };
        return Cell;
    })();
    exports.Cell = Cell;
});
