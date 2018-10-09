import { OpenDocument } from "../core/Document";
import { UIHandlerController } from "./UIHandlerControler";
import { ColumnHeaderHeight, RowHeaderWidth, SheetTitleHeight } from "../common/constants";
import { Cell } from "../core/Cell";

/**
 * Created by SiamandM on 6/23/2016.
 */
///<reference path="UIHandler.ts"/>


export class CellEditor {

    private websheet:OpenDocument;
    private editorArea:HTMLDivElement;
    private selectionElement:HTMLElement;
    private editorElement:HTMLInputElement;


    constructor(public controler:UIHandlerController) {
        this.websheet = controler.websheet;

        this.initialize();
        this.select();

    }

    initialize() {
        this.editorArea = document.createElement('div');
        this.editorArea.style.position = 'absolute';
        this.editorArea.style.top = ColumnHeaderHeight + 'px';
        this.editorArea.style.left = RowHeaderWidth + 'px';
        this.editorArea.style.bottom = SheetTitleHeight + 'px';
        this.editorArea.style.right = '0px';
        this.editorArea.style.overflow = 'visible';
        this.controler.renderer.Element.appendChild(this.editorArea);

        this.selectionElement = document.createElement('div');
        this.selectionElement.style.position = 'absolute';
        this.selectionElement.style.border = 'solid 2px #33f';
        this.selectionElement.style.overflow = 'hidden';
        this.selectionElement.style.background = 'rgba(0,0,0,.1)';
        this.selectionElement.style.transitionDuration = '.1s';
        this.editorArea.appendChild(this.selectionElement);

        this.editorElement = document.createElement('input');
        this.editorElement.type ='text';
        this.editorElement.style.zIndex = '10000';
        this.editorElement.style.position = 'absolute';
        this.editorElement.style.background = '#fff';
        this.editorElement.style.lineHeight = '25px';
        this.editorElement.style.textIndent = '0';
        this.editorElement.style.border = 'none';
        this.editorElement.addEventListener('keypress',(evt) => this.onKeyPress(evt));
        this.editorElement.addEventListener('keydown',(evt) => this.onKeyDown(evt));
        this.selectionElement.appendChild(this.editorElement);
    }

    private onKeyDown(evt:KeyboardEvent) {
        if(evt.key == 'Tab') {
            this.deselect();
            if(evt.shiftKey) {
                this.websheet.ActiveSheet.selectPreviousColumnCell();
            } else {
                this.websheet.ActiveSheet.selectNextColumnCell();
            }
            evt.preventDefault();
            this.select(true);
        }
    }

    private onKeyPress(evt:KeyboardEvent) {
        if(evt.key == 'Enter') {
            this.deselect();
            if(evt.shiftKey) {
                this.websheet.ActiveSheet.selectPreviousRowCell();
            } else {
                this.websheet.ActiveSheet.selectNextRowCell();
            }
            this.select(true);
        }
    }

    disableAnimation() {
        this.selectionElement.style.transitionDuration = '';
    }

    enableAnimation() {
        this.selectionElement.style.transitionDuration = '.1s';
    }

    
    public get Value(){
        return this.editorElement.value;
    }

    public get IsDirty(){
        let cell = this.getCurrentCell();
        return (cell.value != this.Value)
    }

    public deselect() {
        let cell = this.getCurrentCell();
        if(this.IsDirty) {
            cell.value = this.Value;
            this.controler.websheet.ActiveSheet.setCell(cell.columnId,cell.rowId,cell);
            this.controler.renderer.render();
        }
    }

    private getCurrentCell(){
        let sheet = this.controler.websheet.ActiveSheet;
        let selection = sheet.selection;
        return sheet.getCell(selection.columnId, selection.rowId) || new Cell(selection.columnId,selection.rowId); 
    }

    public select(animation:boolean = true) {
        if (animation) {
            this.enableAnimation();
        } else {
            this.disableAnimation();
        }

        let sheet = this.controler.websheet.ActiveSheet;
        let selection = sheet.selection;

        let x1 = sheet.getColumnLeft(selection.left);
        let y1 = sheet.getRowTop(selection.top);
        let x2 = sheet.getColumnRight(selection.right);
        let y2 = sheet.getRowBottom(selection.bottom);

        let w = x2 - x1;
        let h = y2 - y1;

        this.selectionElement.style.left = (x1 - 2) + 'px';
        this.selectionElement.style.top = (y1 - 2) + 'px';
        this.selectionElement.style.width = (w - 2) + 'px';
        this.selectionElement.style.height = (h - 2) + 'px';

        let selectedCell = this.getCurrentCell();

        let editorY = sheet.getRowTop(selection.rowId);
        let editorX = sheet.getColumnLeft(selection.columnId);

        this.editorElement.style.left = (editorX - x1) + 'px';
        this.editorElement.style.top = (editorY - y1) + 'px';
        this.editorElement.style.width = (sheet.getCellWidth(selectedCell) - 3) + 'px';
        this.editorElement.style.height = (sheet.getCellHeight(selectedCell) - 3) + 'px';
        this.editorElement.style.background = sheet.getApperance(selectedCell.columnId,selectedCell.rowId).background;
        this.editorElement.value = selectedCell.value;
        this.editorElement.focus();
    }

}