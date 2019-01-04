define(["require", "exports", "../common/utils", "./Appearance"], function (require, exports, utils_1, Appearance_1) {
    var Commander = (function () {
        function Commander(doc) {
            var _this = this;
            this.doc = doc;
            this.history = [];
            this.commands = [];
            this.commands['bold'] = function () { return _this.appearance(function (app) { return app.bold = !app.bold; }); };
            this.commands['italic'] = function () { return _this.appearance(function (app) { return app.italic = !app.italic; }); };
            this.commands['underline'] = function () { return _this.appearance(function (app) { return app.underline = !app.underline; }); };
            this.commands['font-size'] = function (size) { return _this.appearance(function (app) { return app.fontSize = size; }); };
            this.commands['font-name'] = function (font) { return _this.appearance(function (app) { return app.fontName = font; }); };
            this.commands['bg-color'] = function (color) { return _this.appearance(function (app) { return app.background = color; }); };
            this.commands['fg-color'] = function (color) { return _this.appearance(function (app) { return app.text = color; }); };
            this.commands['top-border'] = function (color) { return _this.topBorder(color); };
            this.commands['left-border'] = function (color) { return _this.leftBorder(color); };
            this.commands['right-border'] = function (color) { return _this.rightBorder(color); };
            this.commands['bottom-border'] = function (color) { return _this.bottomBorder(color); };
            this.commands['cross-border'] = function (color) { return _this.crossBorder(color); };
            this.commands['full-border'] = function (color) {
                _this.topBorder(color);
                _this.leftBorder(color);
                _this.appearance(function (app) {
                    app.setVertical(color);
                    app.setHorizontal(color);
                });
            };
            this.commands['merge'] = function () { return _this.merge(); };
            this.commands['unmerge'] = function () { return _this.unmerge(); };
            this.commands['align'] = function (value) { return _this.appearance(function (app) { return app.alignTextTo(value); }); };
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
        Commander.prototype.crossBorder = function (color) {
            this.logAppearanceOnlyCommand();
            var sel = this.Selection;
            var sheet = this.doc.ActiveSheet;
            for (var c = sel.left; c <= sel.right; c++) {
                for (var r = sel.top; r <= sel.bottom; r++) {
                    var app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance_1.Appearance();
                    if (r < sel.bottom)
                        app.setHorizontal(color);
                    if (c < sel.right)
                        app.setVertical(color);
                    this.ActiveSheet.setCellAppearance(c, r, app, false);
                }
            }
        };
        Commander.prototype.topBorder = function (color) {
            this.logAppearanceOnlyCommand();
            var sel = this.Selection;
            var sheet = this.doc.ActiveSheet;
            var r = sel.top - 1;
            for (var c = sel.left; c <= sel.right; c++) {
                var app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance_1.Appearance();
                app.setHorizontal(color);
                this.ActiveSheet.setCellAppearance(c, r, app, false);
            }
        };
        Commander.prototype.leftBorder = function (color) {
            this.logAppearanceOnlyCommand();
            var sel = this.Selection;
            var sheet = this.doc.ActiveSheet;
            var c = sel.left - 1;
            for (var r = sel.top; r <= sel.bottom; r++) {
                var app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance_1.Appearance();
                app.setVertical(color);
                this.ActiveSheet.setCellAppearance(c, r, app, false);
            }
        };
        Commander.prototype.rightBorder = function (color) {
            this.logAppearanceOnlyCommand();
            var sel = this.Selection;
            var sheet = this.doc.ActiveSheet;
            var c = sel.right;
            for (var r = sel.top; r <= sel.bottom; r++) {
                var app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance_1.Appearance();
                app.setVertical(color);
                this.ActiveSheet.setCellAppearance(c, r, app, false);
            }
        };
        Commander.prototype.bottomBorder = function (color) {
            this.logAppearanceOnlyCommand();
            var sel = this.Selection;
            var sheet = this.doc.ActiveSheet;
            for (var c = sel.left; c <= sel.right; c++) {
                var app = this.ActiveSheet.getCellAppearance(c, sel.bottom) || new Appearance_1.Appearance();
                app.setHorizontal(color);
                this.ActiveSheet.setCellAppearance(c, sel.rowId - 1, app, false);
            }
        };
        Object.defineProperty(Commander.prototype, "SelectedAppearance", {
            get: function () {
                var sel = this.Selection;
                var sheet = this.doc.ActiveSheet;
                var apps = [];
                for (var r = sel.top; r <= sel.bottom; r++) {
                    for (var c = sel.left; c <= sel.right; c++) {
                        var app = sheet.getCellAppearance(sel.columnId, sel.rowId);
                        if (app) {
                            apps.push(utils_1.clone(app));
                        }
                    }
                }
                return apps;
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
        Commander.prototype.logAppearanceOnlyCommand = function () {
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
        Commander.prototype.appearance = function (method) {
            this.logAppearanceOnlyCommand();
            var sel = this.Selection;
            for (var r = sel.top; r <= sel.bottom; r++) {
                for (var c = sel.left; c <= sel.right; c++) {
                    var app = this.ActiveSheet.getCellAppearance(c, r) || new Appearance_1.Appearance();
                    method(app);
                    this.ActiveSheet.setCellAppearance(c, r, app);
                }
            }
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
