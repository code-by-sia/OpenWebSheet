define(["require", "exports", "../../common/constants", "./Context", "../../core/Appearance", "../../core/Sheet"], function (require, exports, constants_1, Context_1, Appearance_1, Sheet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CanvasRenderer = /** @class */ (function () {
        function CanvasRenderer(container, document) {
            var _this = this;
            this.container = container;
            this.document = document;
            this.rendering = false;
            this.renderFrameRate = 10; //FPS
            this.initialize();
            document.addOnChange(function () { return _this.render(); });
        }
        CanvasRenderer.prototype.initialize = function () {
            this.createElements();
            this.resize();
            this.render();
        };
        Object.defineProperty(CanvasRenderer.prototype, "Element", {
            get: function () {
                return this.container;
            },
            enumerable: true,
            configurable: true
        });
        CanvasRenderer.prototype.createElements = function () {
            this.canvas = document.createElement("canvas");
            this.container.appendChild(this.canvas);
        };
        CanvasRenderer.prototype.resize = function () {
            var pixelRatio = window.devicePixelRatio;
            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;
            if (pixelRatio > 1) {
                this.canvas.width = this.width * pixelRatio;
                this.canvas.height = this.height * pixelRatio;
                this.canvas.style.width = this.width + 'px';
                this.canvas.style.height = this.height + 'px';
            }
            else {
                this.canvas.width = this.width;
                this.canvas.height = this.height;
            }
            this.render();
        };
        CanvasRenderer.prototype.get_context2D = function () {
            var pixelRatio = window.devicePixelRatio;
            this.canvas.width = this.canvas.width;
            var context = this.canvas.getContext('2d');
            context.scale(pixelRatio, pixelRatio);
            return context;
        };
        CanvasRenderer.prototype.render = function () {
            var _this = this;
            if (this.rendering) {
                return;
            }
            this.rendering = true;
            setTimeout(function () {
                _this.doRender();
                _this.rendering = false;
            }, 1000 / this.renderFrameRate);
        };
        CanvasRenderer.prototype.doRender = function () {
            console.log('%cRender', "color:" + constants_1.COLOR_1);
            var context2d = this.get_context2D();
            this.context = new Context_1.Context(context2d, this.width, this.height);
            this.renderSheetTitles();
            this.renderSheet();
        };
        CanvasRenderer.prototype.renderTopCorner = function () {
            this.context.fillStyle = '#ececec';
            this.context.fontSize = 12;
            var cornerWidth = constants_1.RowHeaderWidth - 2;
            this.context.fillClosePath(new Context_1.Point(2, cornerWidth), new Context_1.Point(cornerWidth, cornerWidth), new Context_1.Point(cornerWidth, 1));
        };
        CanvasRenderer.prototype.renderSheetTitles = function () {
            var _this = this;
            this.renderTopCorner();
            this.context.strokeSize = 1;
            var x1 = 0;
            var y1 = this.height - constants_1.SheetTitleHeight - .5;
            var rHeight = constants_1.SheetTitleHeight + 5;
            var h = this.height - constants_1.SheetTitleHeight - 0.5;
            this.context.rect(x1, y1, this.width, rHeight);
            this.context.fillStyle = this.context.createGradient(0, h, 0, constants_1.SheetTitleHeight / 3, [0, '#f0f0f0'], [1, '#fff']);
            this.context.fillRect(x1, y1, this.width, rHeight);
            this.context.textAlign = Appearance_1.TextAlign.Center;
            var x = constants_1.RowHeaderWidth;
            var active = this.document.ActiveSheet;
            var delta = 5;
            for (var _i = 0, _a = this.document.Sheets; _i < _a.length; _i++) {
                var sh = _a[_i];
                var sheetWidth = sh.getWidth(function (str) { return _this.context.get_textWidth(str); });
                this.context.strokeStyle = '#aaa';
                this.context.fillStyle = '#fafafa';
                this.context.fontStyle = 'italic';
                if (sh === active) {
                    this.context.fillStyle = '#fff';
                    this.context.fontStyle = 'bold';
                }
                this.context.rect(x, h, sheetWidth, constants_1.SheetTitleHeight - delta);
                this.context.fillText(sh.title, x, h + delta, sheetWidth);
                if (sh === active) {
                    this.context.fillStyle = constants_1.COLOR_3;
                    this.context.fillRect(x, h + constants_1.SheetTitleHeight - delta, sheetWidth, 2);
                    this.context.strokeStyle = constants_1.COLOR_LIGHT;
                }
                this.context.line(x, h, x + sheetWidth, h);
                x += sheetWidth + delta;
            }
            this.context.fontStyle = '';
        };
        CanvasRenderer.prototype.renderSheet = function () {
            var width = this.width;
            var height = this.height;
            var sheetTitleHeight = constants_1.SheetTitleHeight;
            var maskHeight = height - sheetTitleHeight;
            var context = this.context;
            context.setMask(0, 0, width, height - (sheetTitleHeight + 1.5));
            var lastRow = this.renderRows();
            var lastColumn = this.renderColumns();
            context.unmask();
            context.setMask(constants_1.ColumnHeaderHeight + .5, constants_1.RowHeaderWidth, width, maskHeight - constants_1.RowHeaderWidth - .5);
            this.renderCells(lastColumn, lastRow);
            context.unmask();
        };
        CanvasRenderer.prototype.renderRows = function () {
            var context = this.context;
            var height = this.height - constants_1.RowHeaderWidth; // - WebSheet.SheetTitleHeight;
            var cumulativeHeight = constants_1.RowDefaultHeight;
            var sheet = this.document.ActiveSheet;
            var rw = sheet.scrollRow;
            for (; cumulativeHeight <= height; rw++) {
                var rowHeight = sheet.getRowHeight(rw);
                this.paintRow(cumulativeHeight, (rw + 1).toString());
                cumulativeHeight += rowHeight;
            }
            return rw;
        };
        CanvasRenderer.prototype.paintRow = function (top, label) {
            var context = this.context;
            context.save();
            context.strokeSize = 1;
            context.strokeStyle = '#ccc';
            context.fillStyle = '#fafafa';
            context.rect(0, top, constants_1.RowHeaderWidth, this.height);
            context.fillRect(0, top, constants_1.RowHeaderWidth, this.height);
            context.fontSize = 12;
            context.textAlign = Appearance_1.TextAlign.Center;
            context.fillText(label, 0, top + (constants_1.RowDefaultHeight - 12) / 2, constants_1.RowHeaderWidth);
            context.restore();
        };
        CanvasRenderer.prototype.renderColumns = function () {
            var width = this.width;
            var sheet = this.document.ActiveSheet;
            var cumulativeWidth = constants_1.RowHeaderWidth + .5;
            var cl = sheet.scrollColumn;
            for (; cumulativeWidth <= width; cl++) {
                var columnWidth = sheet.getColumnWidth(cl);
                this.paintColumn(cumulativeWidth, Sheet_1.Sheet.get_columnName(cl), columnWidth);
                cumulativeWidth += columnWidth;
            }
            return cl;
        };
        CanvasRenderer.prototype.paintColumn = function (left, label, columnWidth) {
            var context = this.context;
            context.strokeSize = 1;
            context.strokeStyle = '#ccc';
            context.fillStyle = '#fafafa';
            context.fontName = 'Tahoma';
            context.fontSize = 12;
            context.rect(left, 0, this.width, constants_1.ColumnHeaderHeight - 1);
            context.fillRect(left, 0, this.width, constants_1.ColumnHeaderHeight - 1);
            context.fillText(label, left, 7, columnWidth);
        };
        CanvasRenderer.prototype.renderCells = function (lastColumn, lastRow) {
            var x = 0;
            var y = 0;
            var sheet = this.document.ActiveSheet;
            var cellsToPaint = [];
            var context = this.context;
            context.strokeStyle = '#eee';
            context.strokeSize = 1;
            for (var r = sheet.scrollRow - 1; r <= lastRow; r++) {
                var rowHeight = sheet.getRowHeight(r);
                x = 0;
                for (var c = sheet.scrollColumn; c <= lastColumn; c++) {
                    var columnWidth = sheet.getColumnWidth(c);
                    var cell = sheet.getCell(c, r);
                    var appearance = sheet.getApperance(c, r);
                    context.fillStyle = appearance.text;
                    this.paintCell(c, r, x, y);
                    if (y > 0) {
                        var horStyle = appearance.horisontalBorder;
                        var verStyle = appearance.verticalBorder;
                        context.strokeStyle = horStyle.color;
                        context.line(x + constants_1.RowHeaderWidth, y + rowHeight, x + constants_1.RowHeaderWidth + columnWidth, y + rowHeight);
                        context.strokeStyle = verStyle.color;
                        context.line(x + constants_1.RowHeaderWidth + columnWidth, y, x + constants_1.RowHeaderWidth + columnWidth, y + rowHeight);
                    }
                    x += columnWidth;
                }
                y += rowHeight;
            }
        };
        CanvasRenderer.prototype.paintCell = function (columnId, rowId, x, y) {
            var context = this.context;
            var sheet = this.document.ActiveSheet;
            var cell = sheet.getCell(columnId, rowId);
            if (cell == null)
                return;
            var appearance = sheet.getApperance(columnId, rowId);
            var left = x + constants_1.ColumnHeaderHeight + .5;
            if (y < constants_1.RowDefaultHeight)
                return;
            context.fillStyle = appearance.background;
            if (appearance.fontSize)
                context.fontSize = parseInt(appearance.fontSize);
            if (appearance.fontName)
                context.fontName = appearance.fontName;
            context.fontStyle = (appearance.textStyle) ? appearance.textStyle : '';
            var columnWidth = sheet.getColumnWidth(columnId);
            var rowHeight = sheet.getRowHeight(rowId);
            context.setMask(left, y, columnWidth - .5, rowHeight);
            context.fillRect(left, y, columnWidth - .5, rowHeight);
            if (cell.label) {
                context.fillStyle = appearance.text;
                context.strokeStyle = appearance.text;
                context.textAlign = appearance.textAlign;
                context.fillText(cell.label, x + constants_1.ColumnHeaderHeight + 5, y + 7, columnWidth);
            }
            context.unmask();
        };
        return CanvasRenderer;
    }());
    exports.CanvasRenderer = CanvasRenderer;
});
