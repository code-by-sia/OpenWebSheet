define(["require", "exports", "../common/utils", "./Appearance"], function (require, exports, utils_1, Appearance_1) {
    var Commander = (function () {
        function Commander(doc) {
            var _this = this;
            this.doc = doc;
            this.history = [];
            this.commands = [];
            this.commands['bold'] = function () { return _this.bold(); };
            this.commands['italic'] = function () { return _this.italic(); };
            this.commands['underline'] = function () { return _this.underline(); };
            this.commands['font-size'] = function (size) { return _this.fontSize(size); };
            this.commands['font-name'] = function (size) { return _this.fontName(size); };
            this.commands['bg-color'] = function (color) { return _this.bgColor(color); };
            this.commands['fg-color'] = function (color) { return _this.fgColor(color); };
            this.commands['merge'] = function () { return _this.merge(); };
            this.commands['unmerge'] = function () { return _this.unmerge(); };
            this.commands['align'] = function (value) { return _this.align(value); };
            this.commands['change-value'] = function (columnId, rowId, value) { return _this.changeValue(columnId, rowId, value); };
            this.commands['alter-column'] = function (columnId, delta) { return _this.alterColumn(columnId, delta); };
            this.commands['alter-row'] = function (rowId, delta) { return _this.alterRow(rowId, delta); };
        }
        Commander.prototype.has = function (commandName) {
            return !!this.commands[commandName];
        };
        Commander.prototype.do = function (commandName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!this.has(commandName)) {
                console.warn("command " + commandName + " does not exsits!");
            }
            (_a = this.commands)[commandName].apply(_a, args);
            var _a;
        };
        Object.defineProperty(Commander.prototype, "ActiveSheet", {
            get: function () {
                return this.doc.ActiveSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Commander.prototype, "Selection", {
            get: function () {
                return this.ActiveSheet.selection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Commander.prototype, "SelectedAppearance", {
            get: function () {
                var sel = this.Selection;
                var sheet = this.doc.ActiveSheet;
                return utils_1.clone(sheet.getCellApperance(sel.columnId, sel.rowId));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Commander.prototype, "SelectionData", {
            get: function () {
                var sel = this.Selection;
                var sheet = this.doc.ActiveSheet;
                var data = [];
                for (var c = sel.left; c <= sel.right; c++) {
                    for (var r = sel.top; r <= sel.bottom; r++) {
                        var cell = sheet.getCell(c, r);
                        data.push(utils_1.clone(cell));
                    }
                }
                return data;
            },
            enumerable: true,
            configurable: true
        });
        Commander.prototype.logAppearanceOnlyCommnand = function () {
            var sel = this.Selection;
            var historyItem = {
                selection: sel,
                appearance: this.SelectedAppearance
            };
            this.history.push(historyItem);
        };
        Commander.prototype.logDataOnlyCommand = function () {
            var sel = this.Selection;
            var historyItem = {
                selection: sel,
                data: this.SelectionData
            };
            this.history.push(historyItem);
        };
        Commander.prototype.alterColumn = function (column, delta) {
            var w = this.doc.ActiveSheet.getColumnWidth(column);
            this.history.push({
                selection: column,
                data: w,
                meta: 'COLUMN'
            });
            this.doc.ActiveSheet.setColumnWidth(column, w + delta);
        };
        Commander.prototype.alterRow = function (row, delta) {
            var h = this.doc.ActiveSheet.getRowHeight(row);
            this.history.push({
                selection: row,
                data: h,
                meta: 'ROW'
            });
            this.doc.ActiveSheet.setRowHeight(row, h + delta);
        };
        Commander.prototype.changeValue = function (columnId, rowId, value) {
            this.logDataOnlyCommand();
            if (columnId == null)
                columnId = this.Selection.columnId;
            if (rowId == null)
                rowId = this.Selection.rowId;
            this.ActiveSheet.setCellValue(columnId, rowId, value);
        };
        Commander.prototype.merge = function () {
            this.logDataOnlyCommand();
            var sel = this.Selection;
            var c = Math.min(sel.right, sel.left);
            var r = Math.min(sel.top, sel.bottom);
            var w = Math.abs(sel.right - sel.left) + 1;
            var h = Math.abs(sel.top - sel.bottom) + 1;
            this.ActiveSheet.merge(c, r, w, h);
        };
        Commander.prototype.unmerge = function () {
            this.logDataOnlyCommand();
            var sel = this.Selection;
            this.ActiveSheet.unmerge(sel.columnId, sel.rowId);
        };
        Commander.prototype.toggle = function (str, t) {
            str = str || '';
            if (str.indexOf(t) != -1) {
                return str.replace(t, '');
            }
            return str + " " + t;
        };
        Commander.prototype.align = function (value) {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            if (value == 'right')
                app.textAlign = Appearance_1.TextAlign.Right;
            else if (value == 'left')
                app.textAlign = Appearance_1.TextAlign.Left;
            else if (value == 'center')
                app.textAlign = Appearance_1.TextAlign.Center;
            else
                throw value + " is not a valid value";
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.bold = function () {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.textStyle = this.toggle(app.textStyle, ' bold');
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.italic = function () {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.textStyle = this.toggle(app.textStyle, ' italic');
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.underline = function () {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.textStyle = this.toggle(app.textStyle, ' underline');
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.bgColor = function (color) {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.background = color;
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.fgColor = function (color) {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.text = color;
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.fontSize = function (size) {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.fontSize = size;
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.fontName = function (size) {
            this.logAppearanceOnlyCommnand();
            var sel = this.Selection;
            var app = this.SelectedAppearance || new Appearance_1.Appearance();
            app.fontName = size;
            this.ActiveSheet.setCellAppearance(sel.columnId, sel.rowId, app);
        };
        Commander.prototype.undo = function () {
            throw 'undo has not been implemented';
        };
        Commander.prototype.redo = function () {
            throw 'redo has not been implemented';
        };
        return Commander;
    })();
    exports.Commander = Commander;
});
