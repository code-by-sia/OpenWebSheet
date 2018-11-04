define(["require", "exports", "../common/constants", "../core/Cell", "../core/Appearance"], function (require, exports, constants_1, Cell_1, Appearance_1) {
    /**
     * Created by SiamandM on 6/23/2016.
     */
    ///<reference path="UIHandler.ts"/>
    var CellEditor = (function () {
        function CellEditor(controler) {
            this.controler = controler;
            this.websheet = controler.websheet;
            this.initialize();
            this.select();
        }
        CellEditor.prototype.initialize = function () {
            var _this = this;
            this.editorArea = document.createElement('div');
            this.editorArea.style.position = 'absolute';
            this.editorArea.style.top = constants_1.ColumnHeaderHeight + 'px';
            this.editorArea.style.left = constants_1.RowHeaderWidth + 'px';
            this.editorArea.style.bottom = constants_1.SheetTitleHeight + 'px';
            this.editorArea.style.right = '0px';
            this.editorArea.style.overflow = 'visible';
            this.controler.renderer.Element.appendChild(this.editorArea);
            this.selectionElement = document.createElement('div');
            this.selectionElement.style.position = 'absolute';
            this.selectionElement.style.border = "solid 2px " + constants_1.COLOR_1;
            this.selectionElement.style.overflow = 'hidden';
            this.selectionElement.style.background = 'rgba(0,0,0,.1)';
            this.selectionElement.style.transitionDuration = '.1s';
            this.editorArea.appendChild(this.selectionElement);
            this.editorElement = document.createElement('input');
            this.editorElement.type = 'text';
            this.editorElement.style.zIndex = '10000';
            this.editorElement.style.position = 'absolute';
            this.editorElement.style.background = '#fff';
            this.editorElement.style.textIndent = '3px';
            this.editorElement.style.border = 'none';
            this.editorElement.addEventListener('keypress', function (evt) { return _this.onKeyPress(evt); });
            this.editorElement.addEventListener('keydown', function (evt) { return _this.onKeyDown(evt); });
            this.selectionElement.appendChild(this.editorElement);
            this.anchorElement = document.createElement('span');
            this.anchorElement.style.position = 'absolute';
            this.anchorElement.style.right = '0';
            this.anchorElement.style.bottom = '0';
            this.anchorElement.style.width = '6px';
            this.anchorElement.style.height = '6px';
            this.anchorElement.style.borderRadius = '2px';
            this.anchorElement.style.border = 'solid 1px #fff';
            this.anchorElement.style.background = constants_1.COLOR_2;
            this.anchorElement.style.zIndex = '10000';
            this.anchorElement.style.cursor = 'cell';
            this.editorArea.appendChild(this.anchorElement);
            this.websheet.addOnChange(function () {
                var value = _this.websheet.ActiveSheet.SelectedValue;
                if (value != _this.Value) {
                    _this.Value = value;
                }
                _this.updateEitorAppearance();
                _this.select(false);
            });
        };
        CellEditor.prototype.onKeyDown = function (evt) {
            if (evt.key == 'Tab') {
                this.deselect();
                if (evt.shiftKey) {
                    this.websheet.ActiveSheet.selectPreviousColumnCell();
                }
                else {
                    this.websheet.ActiveSheet.selectNextColumnCell();
                }
                evt.preventDefault();
                this.select(true);
            }
        };
        CellEditor.prototype.onKeyPress = function (evt) {
            if (evt.key == 'Enter') {
                this.deselect();
                if (evt.shiftKey) {
                    this.websheet.ActiveSheet.selectPreviousRowCell();
                }
                else {
                    this.websheet.ActiveSheet.selectNextRowCell();
                }
                this.select(true);
            }
        };
        CellEditor.prototype.disableAnimation = function () {
            this.selectionElement.style.transitionDuration = '';
            this.anchorElement.style.transitionDuration = '';
        };
        CellEditor.prototype.enableAnimation = function () {
            this.selectionElement.style.transitionDuration = '.1s';
            this.anchorElement.style.transitionDuration = '.1s';
        };
        Object.defineProperty(CellEditor.prototype, "Value", {
            get: function () {
                return this.editorElement.value;
            },
            set: function (newValue) {
                this.editorElement.value = newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CellEditor.prototype, "IsDirty", {
            get: function () {
                var cell = this.getCurrentCell();
                return (cell.value != this.Value);
            },
            enumerable: true,
            configurable: true
        });
        CellEditor.prototype.deselect = function () {
            var cell = this.getCurrentCell();
            if (this.IsDirty) {
                this.controler.websheet.execCommand('change-value', cell.columnId, cell.rowId, this.Value);
            }
        };
        CellEditor.prototype.getCurrentCell = function () {
            var sheet = this.controler.websheet.ActiveSheet;
            var selection = sheet.selection;
            return sheet.getCell(selection.columnId, selection.rowId) || new Cell_1.Cell(selection.columnId, selection.rowId);
        };
        CellEditor.prototype.getCurrentAppearance = function () {
            var sheet = this.controler.websheet.ActiveSheet;
            var selection = sheet.selection;
            return sheet.getApperance(selection.columnId, selection.rowId);
        };
        CellEditor.prototype.getTextAlign = function (textAlign) {
            if (textAlign == Appearance_1.TextAlign.Center)
                return 'center';
            if (textAlign == Appearance_1.TextAlign.Left)
                return 'left';
            if (textAlign == Appearance_1.TextAlign.Right)
                return 'right';
            return '';
        };
        CellEditor.prototype.updateEitorAppearance = function () {
            var app = this.getCurrentAppearance();
            this.editorElement.style.textAlign = this.getTextAlign(app.textAlign);
            this.editorElement.style.fontStyle = app.italic ? 'italic' : '';
            this.editorElement.style.fontWeight = app.bold ? 'bold' : '';
            this.editorElement.style.background = app.background;
            this.editorElement.style.fontFamily = app.fontName;
            this.editorElement.style.fontSize = app.fontSize + "px";
            this.editorElement.style.color = app.text;
            this.editorElement.style.textDecoration = app.underline ? 'underline' : '';
        };
        CellEditor.prototype.select = function (animation) {
            if (animation === void 0) { animation = true; }
            if (animation) {
                this.enableAnimation();
            }
            else {
                this.disableAnimation();
            }
            this.updateEitorAppearance();
            var sheet = this.controler.websheet.ActiveSheet;
            var selection = sheet.selection;
            var x1 = sheet.getColumnLeft(selection.left);
            var y1 = sheet.getRowTop(selection.top);
            var x2 = sheet.getColumnRight(selection.right);
            var y2 = sheet.getRowBottom(selection.bottom);
            var w = x2 - x1;
            var h = y2 - y1;
            this.selectionElement.style.left = (x1 - 2) + 'px';
            this.selectionElement.style.top = (y1 - 2) + 'px';
            this.selectionElement.style.width = (w - 2) + 'px';
            this.selectionElement.style.height = (h - 2) + 'px';
            var selectedCell = this.getCurrentCell();
            var editorY = sheet.getRowTop(selection.rowId);
            var editorX = sheet.getColumnLeft(selection.columnId);
            this.editorElement.style.left = (editorX - x1) + 'px';
            this.editorElement.style.top = (editorY - y1) + 'px';
            this.editorElement.style.width = (sheet.getCellWidth(selectedCell) - 3) + 'px';
            this.editorElement.style.height = (sheet.getCellHeight(selectedCell) - 3) + 'px';
            this.editorElement.value = selectedCell.value;
            this.editorElement.focus();
            this.anchorElement.style.left = (x2 - 5) + "px";
            this.anchorElement.style.top = (y2 - 5) + "px";
        };
        return CellEditor;
    })();
    exports.CellEditor = CellEditor;
});
