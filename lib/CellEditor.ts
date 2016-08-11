import {WebSheet} from "./WebSheet";
import {UIHandlerControler} from "./UIHandler";
import {Column,Row} from "./Sheet";

/**
 * Created by SiamandM on 6/23/2016.
 */
///<reference path="UIHandler.ts"/>


export class CellEditor {

    websheet:WebSheet;
    editorArea:HTMLDivElement;
    selectionElement:HTMLElement;
    editorElement:HTMLDivElement;


    constructor(public controler:UIHandlerControler) {
        this.websheet = controler.websheet;

        this.initialize();
        this.select();

    }

    initialize() {
        this.editorArea = document.createElement('div');
        this.editorArea.style.position = 'absolute';
        this.editorArea.style.top = Column.HeaderHeight + 'px';
        this.editorArea.style.left = Row.HeaderWidth + 'px';
        this.editorArea.style.bottom = WebSheet.SheetTitleHeight + 'px';
        this.editorArea.style.right = '0px';
        this.editorArea.style.overflow = 'hidden';
        this.websheet.element.appendChild(this.editorArea);

        this.selectionElement = document.createElement('div');
        this.selectionElement.style.position = 'absolute';
        this.selectionElement.style.border = 'solid 2px #33f';
        this.selectionElement.style.background = 'rgba(0,0,0,.1)';
        this.selectionElement.style.transitionDuration = '.1s';
        this.editorArea.appendChild(this.selectionElement);

        this.editorElement = document.createElement('div');
        this.editorElement.contentEditable = 'true';
        this.editorElement.style.zIndex = '10000';
        this.editorElement.style.position = 'absolute';
        this.editorElement.style.background = '#fff';
        this.editorElement.style.lineHeight = '25px';
        this.editorElement.style.textIndent = '5px';
        this.selectionElement.appendChild(this.editorElement);
    }

    disableAnimation() {
        this.selectionElement.style.transitionDuration = '';
    }

    enableAnimation() {
        this.selectionElement.style.transitionDuration = '.1s';
    }

    public save() {
        let sheet = this.controler.websheet.getActiveSheet();
        let cell = sheet.getCell(sheet.selection.columnId, sheet.selection.rowId);
        let text = this.editorElement.innerText;
        if (text != "") {
            cell.value = text;
            cell.save();
            this.controler.websheet.render();
        }
    }

    public select(animation:boolean = true) {
        if (animation) {
            this.enableAnimation();
        } else {
            this.disableAnimation();
        }

        let sheet = this.controler.websheet.getActiveSheet();
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


        let selectedCell = sheet.getCell(selection.columnId, selection.rowId);
        let editorY = sheet.getRowTop(selection.rowId);
        let editorX = sheet.getColumnLeft(selection.columnId);

        this.editorElement.style.left = (editorX - x1) + 'px';
        this.editorElement.style.top = (editorY - y1) + 'px';
        this.editorElement.style.width = (selectedCell.getWidth() - 2) + 'px';
        this.editorElement.style.height = (selectedCell.getHeight() - 2) + 'px';
        this.editorElement.style.background = selectedCell.getFill();
        this.editorElement.innerText = selectedCell.value;
        this.editorElement.focus();
    }

}