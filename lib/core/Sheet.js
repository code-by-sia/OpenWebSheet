define(["require", "exports", "./Cell", "./Appearance"], function (require, exports, Cell_1, Appearance_1) {
    var CellSelection = (function () {
        function CellSelection() {
        }
        Object.defineProperty(CellSelection.prototype, "single", {
            get: function () {
                return this.right == this.left && this.top == this.bottom;
            },
            enumerable: true,
            configurable: true
        });
        return CellSelection;
    })();
    exports.CellSelection = CellSelection;
    var Sheet = (function () {
        function Sheet(title) {
            this.title = title;
            this.data = [];
            this.defaultAppearance = new Appearance_1.Appearance();
            this.defaultRowHeight = 30;
            this.defaultColumnWidth = 100;
            this.appearance = [];
            this.columnAppearance = [];
            this.rowAppearance = [];
            this.rowHeight = [];
            this.columnWidth = [];
            this.scrollX = 0;
            this.scrollY = 0;
            this.change_listeners = [];
            this.defaultAppearance.background = '#fff';
            this.defaultAppearance.fontName = 'lato';
            this.defaultAppearance.fontSize = 12;
            this.defaultAppearance.horisontalBorder = new Appearance_1.Border('#eee');
            this.defaultAppearance.verticalBorder = new Appearance_1.Border('#eee');
            this.defaultAppearance.text = '#444';
            this.selection = new CellSelection();
            this.selection.top = 0;
            this.selection.left = 0;
            this.selection.right = 0;
            this.selection.bottom = 0;
            this.selection.rowId = 0;
            this.selection.columnId = 0;
        }
        Sheet.prototype.selectNextColumnCell = function () {
            this.selection.columnId++;
            if (this.selection.single) {
                this.selection.right = this.selection.columnId;
                this.selection.left = this.selection.columnId;
                return;
            }
            if (this.selection.columnId > this.selection.right) {
                this.selection.columnId = this.selection.left;
                if (this.selection.rowId == this.selection.bottom) {
                    this.selection.rowId = this.selection.top;
                }
                else {
                    this.selectNextRowCell();
                }
            }
        };
        Sheet.prototype.selectPreviousColumnCell = function () {
            this.selection.columnId--;
            if (this.selection.single) {
                this.selection.right = this.selection.columnId;
                this.selection.left = this.selection.columnId;
                return;
            }
            if (this.selection.columnId < this.selection.left) {
                this.selection.columnId = this.selection.right;
                if (this.selection.rowId == this.selection.top) {
                    this.selection.rowId = this.selection.bottom;
                }
                else {
                    this.selectPreviousRowCell();
                }
            }
        };
        Sheet.prototype.selectNextRowCell = function () {
            this.selection.rowId++;
            if (this.selection.single) {
                this.selection.top = this.selection.rowId;
                this.selection.bottom = this.selection.rowId;
                return;
            }
            if (this.selection.rowId > this.selection.bottom) {
                this.selection.rowId = this.selection.top;
                if (this.selection.columnId == this.selection.right) {
                    this.selection.columnId = this.selection.left;
                }
                else {
                    this.selectNextColumnCell();
                }
            }
        };
        Sheet.prototype.selectPreviousRowCell = function () {
            this.selection.rowId--;
            if (this.selection.single) {
                this.selection.top = this.selection.rowId;
                this.selection.bottom = this.selection.rowId;
                return;
            }
            if (this.selection.rowId < this.selection.top) {
                this.selection.rowId = this.selection.bottom;
                if (this.selection.columnId == this.selection.left) {
                    this.selection.columnId = this.selection.right;
                }
                else {
                    this.selectPreviousColumnCell();
                }
            }
        };
        Sheet.prototype.getColumnLeft = function (columnId) {
            var result = 0;
            for (var i = this.scrollColumn; i < columnId; i++) {
                result += this.getColumnWidth(i);
            }
            return result;
        };
        Sheet.prototype.getColumnRight = function (columnId) {
            return this.getColumnLeft(columnId) + this.getColumnWidth(columnId);
        };
        Sheet.prototype.getRowTop = function (rowId) {
            var result = 0;
            for (var i = this.scrollRow; i < rowId; i++) {
                result += this.getRowHeight(i);
            }
            return result;
        };
        Sheet.prototype.getRowBottom = function (rowId) {
            return this.getRowTop(rowId) + this.getRowHeight(rowId);
        };
        Sheet.prototype.findColumnIdByX = function (x) {
            if (x < 0)
                return 0;
            var colX = 0;
            for (var colId = this.scrollColumn;; colId++) {
                if (colId > this.scrollColumn + 100)
                    return 0;
                var colW = this.getColumnWidth(colId);
                if (x > colX && x < colX + colW) {
                    return colId;
                }
                colX += colW;
            }
        };
        Sheet.prototype.findRowIdByY = function (y) {
            var rowY = this.getRowHeight(this.scrollRow);
            var rowId = this.scrollRow;
            while (rowY < y) {
                rowY += this.getRowHeight(rowId);
                rowId++;
            }
            return rowId;
        };
        Sheet.prototype.findCellByXY = function (x, y) {
            var colId = this.findColumnIdByX(x);
            var rowId = this.findRowIdByY(y);
            return this.getCell(colId, rowId);
        };
        Sheet.prototype.selectByXY = function (x1, y1, x2, y2) {
            var top = Math.min(y1, y2);
            var left = Math.min(x1, x2);
            var right = Math.max(x1, x2);
            var bottom = Math.max(y1, y2);
            this.selection.top = this.findRowIdByY(top);
            this.selection.bottom = this.findRowIdByY(bottom);
            this.selection.left = this.findColumnIdByX(left);
            this.selection.right = this.findColumnIdByX(right);
            this.selection.rowId = this.findRowIdByY(y1);
            this.selection.columnId = this.findColumnIdByX(x1);
        };
        Sheet.prototype.scrollDown = function () {
            this.scroll(this.scrollColumn, this.scrollRow + 1);
        };
        Sheet.prototype.scrollUp = function () {
            this.scroll(this.scrollColumn, this.scrollRow - 1);
        };
        Sheet.prototype.scrollLeft = function () {
            this.scroll(this.scrollColumn + 1, this.scrollRow);
        };
        Sheet.prototype.scrollRight = function () {
            this.scroll(this.scrollColumn - 1, this.scrollRow);
        };
        Sheet.prototype.getCellHeight = function (cell) {
            var height = 0;
            for (var i = cell.rowId; i < cell.rowId + cell.rowSpan; i++) {
                height += this.getRowHeight(i);
            }
            return height;
        };
        Sheet.prototype.getCellWidth = function (cell) {
            var width = 0;
            for (var i = cell.columnId; i < cell.columnId + cell.colSpan; i++) {
                width += this.getColumnWidth(i);
            }
            return width;
        };
        Sheet.prototype.scroll = function (columnId, rowId) {
            if (columnId < 0)
                return;
            if (rowId < 0)
                return;
            for (var x in this.data) {
                for (var y in this.data[x]) {
                    var cell = this.data[x][y];
                    if (cell.columnId < parseInt(x)) {
                        columnId = cell.columnId + cell.colSpan;
                    }
                    if (cell.rowId < parseInt(y)) {
                        rowId = cell.rowId + cell.rowSpan;
                    }
                }
            }
            this.scrollX = columnId;
            this.scrollY = rowId;
            this.onChange();
        };
        Sheet.prototype.merge = function (columnId, rowId, width, height) {
            var cell = this.forceGetCell(columnId, rowId);
            cell.colSpan = width;
            cell.rowSpan = height;
            for (var x = columnId; x < columnId + width; x++) {
                for (var y = rowId; y < rowId + height; y++) {
                    this.setCell(columnId, rowId, cell);
                }
            }
            this.onChange();
        };
        Sheet.prototype.unmerge = function (columnId, rowId) {
            var cell = this.getCell(columnId, rowId);
            if (!cell || (cell.rowSpan != 0 && cell.colSpan != 0))
                return;
            for (var x = columnId; x < columnId + cell.colSpan; x++) {
                for (var y = rowId; y < rowId + cell.rowSpan; y++) {
                    if (x != columnId && y != rowId) {
                        this.data[columnId][rowId] = undefined;
                    }
                }
            }
            cell.rowSpan = 0;
            cell.colSpan = 0;
            this.onChange();
        };
        Object.defineProperty(Sheet.prototype, "scrollColumn", {
            get: function () {
                return this.scrollX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "scrollRow", {
            get: function () {
                return this.scrollY;
            },
            enumerable: true,
            configurable: true
        });
        Sheet.prototype.forceGetCell = function (columnId, rowId) {
            var cell = this.getCell(columnId, rowId);
            if (!cell) {
                cell = new Cell_1.Cell(columnId, rowId);
                this.setCell(columnId, rowId, cell);
            }
            return cell;
        };
        Sheet.prototype.getCell = function (columnId, rowId) {
            if (!this.data[columnId] || !this.data[columnId][rowId]) {
                return null;
            }
            return this.data[columnId][rowId];
        };
        Sheet.prototype.setCell = function (columnId, rowId, cell) {
            if (!this.data[columnId]) {
                this.data[columnId] = [];
            }
            this.data[columnId][rowId] = cell;
            this.onChange();
        };
        Sheet.prototype.getColumnApperance = function (columnId) {
            return this.columnAppearance[columnId];
        };
        Sheet.prototype.getRowAppearance = function (rowId) {
            return this.rowAppearance[rowId];
        };
        Sheet.prototype.getCellApperance = function (columnId, rowId) {
            if (!this.appearance[columnId] || !this.appearance[columnId][rowId]) {
                return null;
            }
            return this.appearance[columnId][rowId];
        };
        Sheet.prototype.setCellAppearance = function (columnId, rowId, appearance) {
            if (!this.appearance[columnId]) {
                this.appearance[columnId] = [];
            }
            this.appearance[columnId][rowId] = appearance;
            this.onChange();
        };
        Sheet.prototype.setColumApperance = function (columnId, apperance) {
            this.columnAppearance[columnId] = apperance;
            this.onChange();
        };
        Sheet.prototype.setRowAppearance = function (rowId, apperance) {
            this.rowAppearance[rowId] = apperance;
            this.onChange();
        };
        Sheet.prototype.getRowHeight = function (rowId) {
            return this.rowHeight[rowId] || this.defaultRowHeight;
        };
        Sheet.prototype.getColumnWidth = function (columnId) {
            return this.columnWidth[columnId] || this.defaultColumnWidth;
        };
        Sheet.prototype.getApperance = function (columnId, rowId) {
            var appearance = new Appearance_1.Appearance();
            var cell = this.getCellApperance(columnId, rowId);
            var col = this.getColumnApperance(columnId);
            var row = this.getRowAppearance(rowId);
            var def = this.defaultAppearance;
            appearance.background = (cell && cell.background) || (col && col.background) || (row && row.background) || def.background;
            appearance.fontName = (cell && cell.fontName) || (col && col.fontName) || (row && row.fontName) || def.fontName;
            appearance.fontSize = (cell && cell.fontSize) || (col && col.fontSize) || (row && row.fontSize) || def.fontSize;
            appearance.horisontalBorder = (cell && cell.horisontalBorder) || (col && col.horisontalBorder) || (row && row.horisontalBorder) || def.horisontalBorder;
            appearance.verticalBorder = (cell && cell.verticalBorder) || (col && col.verticalBorder) || (row && row.verticalBorder) || def.verticalBorder;
            appearance.text = (cell && cell.text) || (col && col.text) || (row && row.text) || def.text;
            appearance.textAlign = (cell && cell.textAlign) || (col && col.textAlign) || (row && row.textAlign) || def.textAlign;
            appearance.textStyle = (cell && cell.textStyle) || (col && col.textStyle) || (row && row.textStyle) || def.textStyle;
            return appearance;
        };
        Sheet.get_columnName = function (column) {
            var az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var columnString = "";
            var columnNumber = column + 1;
            while (columnNumber > 0) {
                var currentLetterNumber = (columnNumber - 1) % 26;
                var currentLetter = az[currentLetterNumber];
                columnString = currentLetter + columnString;
                columnNumber = (columnNumber - (currentLetterNumber + 1)) / 26;
            }
            return columnString;
        };
        Sheet.prototype.onChange = function () {
            this.change_listeners.forEach(function (m) { return m(); });
        };
        Sheet.prototype.addOnChange = function (handler) {
            this.change_listeners.push(handler);
        };
        Sheet.prototype.removeOnChange = function (handler) {
            var ix = this.change_listeners.indexOf(handler);
            if (ix >= 0) {
                this.change_listeners.splice(ix, 1);
            }
        };
        return Sheet;
    })();
    exports.Sheet = Sheet;
});
