define(["require", "exports", "./Cell", "./Appearance", "../common/constants", "./formula/Evaluator"], function (require, exports, Cell_1, Appearance_1, constants_1, Evaluator_1) {
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
        CellSelection.prototype.toString = function () {
            return this.top + " " + this.left + " - " + this.bottom + " " + this.right;
        };
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
            this.defaultAppearance.background = '#ffffff';
            this.defaultAppearance.fontName = 'lato';
            this.defaultAppearance.fontSize = 12;
            this.defaultAppearance.horisontalBorder = new Appearance_1.Border('#eeeeee');
            this.defaultAppearance.verticalBorder = new Appearance_1.Border('#eeeeee');
            this.defaultAppearance.text = '#444444';
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
                this.onChange();
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
            if (this.invalidSelection)
                this.selectNextColumnCell();
            this.onChange();
        };
        Sheet.prototype.getCellName = function (columnId, rowId) {
            return "" + Sheet.get_columnName(columnId) + (rowId + 1);
        };
        Object.defineProperty(Sheet.prototype, "SelectionLabel", {
            get: function () {
                return this.getCellName(this.selection.columnId, this.selection.rowId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "SelectedValue", {
            get: function () {
                return this.selectedCell && this.selectedCell.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "SelectedAppearance", {
            get: function () {
                return this.getApperance(this.selection.columnId, this.selection.rowId);
            },
            enumerable: true,
            configurable: true
        });
        Sheet.prototype.selectPreviousColumnCell = function () {
            if (this.selection.columnId == 0)
                return;
            this.selection.columnId--;
            if (this.selection.single) {
                this.selection.right = this.selection.columnId;
                this.selection.left = this.selection.columnId;
                this.onChange();
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
            if (this.invalidSelection)
                this.selectPreviousColumnCell();
            this.onChange();
        };
        Object.defineProperty(Sheet.prototype, "selectedCell", {
            get: function () {
                return this.getCell(this.selection.columnId, this.selection.rowId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "invalidSelection", {
            get: function () {
                return this.selectedCell && this.selectedCell.isMerged;
            },
            enumerable: true,
            configurable: true
        });
        Sheet.prototype.selectNextRowCell = function () {
            this.selection.rowId++;
            if (this.selection.single) {
                this.selection.top = this.selection.rowId;
                this.selection.bottom = this.selection.rowId;
                this.onChange();
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
            if (this.invalidSelection)
                this.selectNextRowCell();
            this.onChange();
        };
        Sheet.prototype.selectPreviousRowCell = function () {
            if (this.selection.rowId == 0)
                return;
            this.selection.rowId--;
            if (this.selection.single) {
                this.selection.top = this.selection.rowId;
                this.selection.bottom = this.selection.rowId;
                this.onChange();
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
            if (this.invalidSelection)
                this.selectPreviousRowCell();
            this.onChange();
        };
        Sheet.prototype.getEvaluatedValue = function (exp) {
            if (exp.indexOf(':') != -1) {
                return [];
            }
            var regex = /([a-zA-z]+)([0-9]+)/g;
            var pos = regex.exec(exp);
            var columnId = this.getColumnIndex(pos[1]);
            var rowId = parseInt(pos[2]) - 1;
            return this.getCellEvaluatedValue(columnId, rowId);
        };
        Sheet.prototype.getColumnIndex = function (name) {
            var sum = 0;
            var pwr = 1;
            var st = 65;
            for (var i = name.length - 1; i >= 0; i--) {
                var ch = name.charCodeAt(i) - st;
                sum += ch * pwr;
                pwr *= 26;
                st = 64;
            }
            return sum;
        };
        Sheet.prototype.getCellEvaluatedValue = function (columnId, rowId) {
            var cell = this.getCell(columnId, rowId);
            if (cell == null) {
                return null;
            }
            return Evaluator_1.Evaluator.Eval(this, cell.value); //TODO: should be cached and check cycles
        };
        Sheet.prototype.setCellValue = function (columnId, rowId, value) {
            var cell = this.forceGetCell(columnId, rowId);
            if (value.startsWith('=')) {
                var evaluatedValue = Evaluator_1.Evaluator.Eval(this, value);
                cell.update(value, evaluatedValue);
            }
            else {
                cell.value = value;
            }
            this.updateDependees(columnId, rowId);
            this.onChange();
        };
        Sheet.prototype.updateDependees = function (columnId, rowId) {
            //TODO: check cyclic dependencies!!!!
            var cellName = "" + Sheet.get_columnName(columnId) + (rowId + 1);
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var d = _a[_i];
                if (!d)
                    continue;
                for (var _b = 0; _b < d.length; _b++) {
                    var c = d[_b];
                    if (!c || !c.value)
                        continue;
                    if (c.value.indexOf(cellName) != -1) {
                        this.setCellValue(c.columnId, c.rowId, c.value);
                    }
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
                rowId++;
                rowY += this.getRowHeight(rowId);
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
            var stop = this.findRowIdByY(top);
            var sbottom = this.findRowIdByY(bottom);
            var sleft = this.findColumnIdByX(left);
            var sright = this.findColumnIdByX(right);
            var rowId = this.findRowIdByY(y1);
            var columnId = this.findColumnIdByX(x1);
            var selectedCell = this.getCell(columnId, rowId);
            if (selectedCell && selectedCell.isMerged) {
                rowId = selectedCell.reference.rowId;
                columnId = selectedCell.reference.columnId;
            }
            var ftop = stop;
            var fbottom = sbottom + 1;
            var fleft = sleft;
            var fright = sright + 1;
            for (var x = sleft; x <= sright; x++) {
                for (var y = stop; y <= sbottom; y++) {
                    var cell = this.getCell(x, y);
                    if (cell) {
                        ftop = Math.min(ftop, cell.top);
                        fleft = Math.min(fleft, cell.left);
                        fbottom = Math.max(fbottom, cell.bottom);
                        fright = Math.max(fright, cell.right);
                    }
                }
            }
            this.selection.top = ftop;
            this.selection.left = fleft;
            this.selection.right = fright - 1;
            this.selection.bottom = fbottom - 1;
            this.selection.rowId = rowId;
            this.selection.columnId = columnId;
            this.onChange();
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
            this.setCell(columnId, rowId, cell);
            for (var x = columnId; x < columnId + width; x++) {
                for (var y = rowId; y < rowId + height; y++) {
                    if (y != rowId || x != columnId) {
                        var xcell = this.forceGetCell(x, y);
                        xcell.reference = cell;
                        this.setCell(x, y, xcell);
                    }
                }
            }
            this.onChange();
        };
        Sheet.prototype.unmerge = function (columnId, rowId) {
            var cell = this.getCell(columnId, rowId);
            if (!cell || (cell.rowSpan == 1 && cell.colSpan == 1))
                return;
            for (var i = 0; i < cell.colSpan; i++) {
                for (var j = 0; j < cell.rowSpan; j++) {
                    var cx = this.getCell(i + columnId, j + rowId);
                    if (!cx)
                        continue;
                    cx.reference = null;
                    this.setCell(i + columnId, j + rowId, cx, true);
                }
            }
            cell.rowSpan = 1;
            cell.colSpan = 1;
            this.setCell(columnId, rowId, cell, true);
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
        Sheet.prototype.setCell = function (columnId, rowId, cell, silent) {
            if (silent === void 0) { silent = false; }
            if (!this.data[columnId]) {
                this.data[columnId] = [];
            }
            this.data[columnId][rowId] = cell;
            if (!silent)
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
        Sheet.prototype.setRowHeight = function (row, height) {
            this.rowHeight[row] = height;
            this.onChange();
        };
        Sheet.prototype.getColumnWidth = function (columnId) {
            return this.columnWidth[columnId] || this.defaultColumnWidth;
        };
        Sheet.prototype.setColumnWidth = function (column, width) {
            this.columnWidth[column] = width;
            this.onChange();
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
        Sheet.prototype.getWidth = function (measure) {
            return constants_1.SheetTitleWidth;
            //return Math.max(SheetTitleWidth, measure(this.title) + 10); TODO: use this
        };
        return Sheet;
    })();
    exports.Sheet = Sheet;
});
