import { OpenDocument } from './core/Document';
import { DocumentRenderer } from './rendering/DocumentRenderer';
import { CanvasRenderer } from './rendering/canvas/CanvasRendering';
import { UIHandlerController } from './editor/UIHandlerControler';

export class UI {

  get isMerged() {
    const cell = this.selectedCell;
    if (!cell) { return false; }
    return (cell.colSpan > 1) || (cell.rowSpan > 1);
  }

  public get selectedCell() {
    return this.document.ActiveSheet.selectedCell;
  }

  public get SelectedCellLabel() {
    return this.document.ActiveSheet.SelectionLabel;
  }

  public get SelectedValue() {
    return this.document.ActiveSheet.SelectedValue;
  }

  public get SelectedAppearance() {
    return this.document.ActiveSheet.SelectedAppearance;
  }

  private handlers: Array<(doc: OpenDocument) => void> = [];
  private document: OpenDocument = new OpenDocument();
  private readonly render: DocumentRenderer | null = null;
  private uiController: UIHandlerController;

  public constructor(private element: HTMLElement) {
    this.render = new CanvasRenderer(element, this.document);
    this.uiController = new UIHandlerController(this.document, this.render);
    this.document.addOnChange(() => this.raiseOnChangeEventListener());
    this.render.render();

    (element as any).openDocument = this.document;
  }

  public execCmd(cmd: string, ...args: any[]) {
    console.log(`the command _${cmd}_ executed.`);
    this.uiController.commit();
    this.document.execCommand(cmd, ...args);
  }

  public addOnChangeEventListener(handler: (doc: OpenDocument) => void) {
    this.handlers.push(handler);
  }

  public removeOnChangeEventListener(handler: (doc: OpenDocument) => void) {
    const ix = this.handlers.indexOf(handler);
    if (ix != -1) {
      this.handlers.splice(ix, 1);
    }
  }

  public save() {
    return JSON.stringify(this.document.save());
  }

  public load(data: any) {
    const obj = JSON.parse(data);
    this.document.load(obj);
  }

  private raiseOnChangeEventListener() {
    this.handlers.forEach((handler) => handler(this.document));
  }
}
