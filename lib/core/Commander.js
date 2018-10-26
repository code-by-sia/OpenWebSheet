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
            this.commands['fontSize'] = function (size) { return _this.fontSize(size); };
            this.commands['fontName'] = function (size) { return _this.fontName(size); };
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
        Commander.prototype.logAppearanceOnlyCommnand = function () {
            var sel = this.Selection;
            var historyItem = {
                selection: sel,
                appearance: this.SelectedAppearance
            };
            this.history.push(historyItem);
        };
        Commander.prototype.toggle = function (str, t) {
            str = str || '';
            if (str.indexOf(t) != -1) {
                return str.replace(t, '');
            }
            return str + " " + t;
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
