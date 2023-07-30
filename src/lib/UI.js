import { OpenDocument } from './core/Document';
import { CanvasRenderer } from './rendering/canvas/CanvasRendering';
import { UIHandlerController } from './editor/UIHandlerControler';

export default class UI {

  get isMerged() {
    const cell = this.selectedCell;
    if (!cell) { return false; }
    return (cell.colSpan > 1) || (cell.rowSpan > 1);
  }

  get selectedCell() {
    return this.document.ActiveSheet.selectedCell;
  }

  get SelectedCellLabel() {
    return this.document.ActiveSheet.SelectionLabel;
  }

  get SelectedValue() {
    return this.document.ActiveSheet.SelectedValue;
  }

  get SelectedAppearance() {
    return this.document.ActiveSheet.SelectedAppearance;
  }

  handlers = [];
  document = new OpenDocument();


  constructor(element) {
    this._element = element;
    this.render = new CanvasRenderer(element, this.document);
    this.uiController = new UIHandlerController(this.document, this.render);
    this.document.addOnChange(() => this._raiseOnChangeEventListener());
    this.render.render();

    this._element.openDocument = this.document;
  }

  execCmd(cmd, ...args) {
    console.log(`the command _${cmd}_ executed.`);
    this.uiController.commit();
    this.document.execCommand(cmd, ...args);
  }

  addOnChangeEventListener(handler) {
    this.handlers.push(handler);
  }

  removeOnChangeEventListener(handler) {
    const ix = this.handlers.indexOf(handler);
    if (ix != -1) {
      this.handlers.splice(ix, 1);
    }
  }

  save() {
    return JSON.stringify(this.document.save());
  }

  load(data) {
    const obj = JSON.parse(data);
    this.document.load(obj);
  }

  _raiseOnChangeEventListener() {
    this.handlers.forEach((handler) => handler(this.document));
  }
}
