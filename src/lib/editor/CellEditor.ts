import { OpenDocument } from "../core/Document";
import { UIHandlerController } from "./UIHandlerControler";
import {
  ColumnHeaderHeight,
  RowHeaderWidth,
  SheetTitleHeight,
  COLOR_1,
  COLOR_2,
} from "../common/constants";
import { Cell } from "../core/Cell";
import { Sheet } from "../core/Sheet";
import { TextAlign } from "../core/Appearance";
import { CellValue } from "@/lib/common/types";

/**
 * Created by SiamandM on 6/23/2016.
 */
/// <reference path="UIHandler.ts"/>

export class CellEditor {
  public get Value() {
    if (this.editorElement.value == "") {
      return null;
    }

    return this.editorElement.value;
  }

  public set Value(newValue: CellValue) {
    if (this.editorElement) {
      this.editorElement.value = newValue ? newValue + "" : "";
    }
  }

  public get IsDirty() {
    const cell = this.getCurrentCell();
    return cell.value != this.Value;
  }

  public get EditMode() {
    return this.editMode;
  }

  public set EditMode(mode: boolean) {
    this.editMode = mode;
    if (mode) {
      this.editorElement.readOnly = false;
    } else {
      this.editorElement.readOnly = true;
    }
    this.editorElement.focus();
  }

  private websheet: OpenDocument;
  private editorArea!: HTMLDivElement;
  private selectionElement!: HTMLElement;
  private editorElement!: HTMLInputElement;
  private anchorElement!: HTMLSpanElement;
  private editMode = false;

  constructor(public controler: UIHandlerController) {
    this.websheet = controler.websheet;
    this.initialize();
    this.select();
  }

  public initialize() {
    this.editorArea = document.createElement("div");
    this.editorArea.style.position = "absolute";
    this.editorArea.style.top = ColumnHeaderHeight + "px";
    this.editorArea.style.left = RowHeaderWidth + "px";
    this.editorArea.style.bottom = SheetTitleHeight + "px";
    this.editorArea.style.right = "0px";
    this.editorArea.style.overflow = "visible";
    this.controler.renderer.Element.appendChild(this.editorArea);

    this.selectionElement = document.createElement("div");
    this.selectionElement.style.position = "absolute";
    this.selectionElement.style.border = `solid 2px ${COLOR_1}`;
    this.selectionElement.style.overflow = "hidden";
    this.selectionElement.style.background = "rgba(0,0,0,.1)";
    this.selectionElement.style.transitionDuration = ".1s";
    this.editorArea.appendChild(this.selectionElement);

    this.editorElement = document.createElement("input");
    this.editorElement.type = "text";
    this.editorElement.style.display = "block";
    this.editorElement.style.zIndex = "10000";
    this.editorElement.style.position = "absolute";
    this.editorElement.style.background = "#fff";
    this.editorElement.style.textIndent = "3px";
    this.editorElement.style.border = "none";

    const forceEditMode = () => {
      if (!this.EditMode) {
        this.EditMode = true;
      }
    };

    this.editorElement.addEventListener("click", forceEditMode);
    this.editorElement.addEventListener("change", forceEditMode);
    this.editorElement.addEventListener("touchstart", forceEditMode);

    this.selectionElement.appendChild(this.editorElement);

    this.anchorElement = document.createElement("span");
    this.anchorElement.style.position = "absolute";
    this.anchorElement.style.right = "0";
    this.anchorElement.style.bottom = "0";
    this.anchorElement.style.width = "6px";
    this.anchorElement.style.height = "6px";
    this.anchorElement.style.borderRadius = "2px";
    this.anchorElement.style.border = "solid 1px #fff";
    this.anchorElement.style.background = COLOR_2;
    this.anchorElement.style.zIndex = "10000";
    this.anchorElement.style.cursor = "cell";
    this.editorArea.appendChild(this.anchorElement);

    this.websheet.addOnChange(() => {
      const value = this.websheet.ActiveSheet.SelectedValue;
      if (value != this.Value) {
        this.Value = value;
      }

      this.updateEditorAppearance();
      this.select(true);
    });
  }

  public disableAnimation() {
    this.selectionElement.style.transitionDuration = "";
    this.anchorElement.style.transitionDuration = "";
  }

  public enableAnimation() {
    this.selectionElement.style.transitionDuration = ".1s";
    this.anchorElement.style.transitionDuration = ".1s";
  }

  public deselect() {
    const cell = this.getCurrentCell();
    if (this.IsDirty) {
      this.controler.websheet.execCommand(
        "change-value",
        cell.columnId,
        cell.rowId,
        this.Value
      );
    }
  }

  public updateEditorAppearance() {
    const app = this.getCurrentAppearance();

    this.editorElement.style.textAlign = this.getTextAlign(app.textAlign);
    this.editorElement.style.fontStyle = app.italic ? "italic" : "";
    this.editorElement.style.fontWeight = app.bold ? "bold" : "";
    this.editorElement.style.background = app.background;
    this.editorElement.style.fontFamily = app.fontName;
    this.editorElement.style.fontSize = `${app.fontSize}px`;
    this.editorElement.style.color = app.text;
    this.editorElement.style.textDecoration = app.underline ? "underline" : "";
  }

  public select(animation = true) {
    if (animation) {
      this.enableAnimation();
    } else {
      this.disableAnimation();
    }

    this.updateEditorAppearance();

    const sheet = this.controler.websheet.ActiveSheet;
    const selection = sheet.selection;

    const x1 = sheet.getColumnLeft(selection.left);
    const y1 = sheet.getRowTop(selection.top);
    const x2 = sheet.getColumnRight(selection.right);
    const y2 = sheet.getRowBottom(selection.bottom);

    const w = x2 - x1;
    const h = y2 - y1;

    this.selectionElement.style.left = `${x1}px`;
    this.selectionElement.style.top = `${y1}px`;
    this.selectionElement.style.width = `${w}px`;
    this.selectionElement.style.height = `${h}px`;

    const selectedCell = this.getCurrentCell();

    const editorY = sheet.getRowTop(selection.rowId);
    const editorX = sheet.getColumnLeft(selection.columnId);

    this.editorElement.style.left = editorX - x1 + "px";
    this.editorElement.style.top = editorY - y1 + "px";
    this.editorElement.style.width = `${
      sheet.getCellWidth(selectedCell) - 3
    }px`;
    this.editorElement.style.height = `${
      sheet.getCellHeight(selectedCell) - 3
    }px`;
    this.editorElement.tabIndex = 0;
    this.editorElement.focus();

    this.anchorElement.style.left = `${x2 - 5}px`;
    this.anchorElement.style.top = `${y2 - 5}px`;
  }

  private getCurrentCell() {
    const sheet = this.controler.websheet.ActiveSheet;
    const selection = sheet.selection;
    return (
      sheet.getCell(selection.columnId, selection.rowId) ||
      new Cell(selection.columnId, selection.rowId)
    );
  }

  private getCurrentAppearance() {
    const sheet = this.controler.websheet.ActiveSheet;
    const selection = sheet.selection;
    return sheet.getAppearance(selection.columnId, selection.rowId);
  }

  private getTextAlign(textAlign: TextAlign) {
    if (textAlign == TextAlign.Center) {
      return "center";
    }
    if (textAlign == TextAlign.Left) {
      return "left";
    }
    if (textAlign == TextAlign.Right) {
      return "right";
    }
    return "";
  }
}
