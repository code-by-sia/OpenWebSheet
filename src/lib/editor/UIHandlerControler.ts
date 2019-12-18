import { UIHandler } from './UIHandler';
import { CellEditor } from './CellEditor';
import { WebSheetUIHandler } from './DocumentHandler';
import { SheetUIHandler } from './SheetUIHandler';
import { OpenDocument } from '../core/Document';
import { DocumentRenderer } from '../rendering/DocumentRenderer';
import { ResizeHandler } from './ResizeHandler';

export class UIHandlerController {

  public get EditMode() {
    return this.cellEditor.EditMode;
  }

  public set EditMode(mode: boolean) {
    this.cellEditor.EditMode = mode;
  }

  get locked() {
    return !!this.lockedOn;
  }

  private handlers: UIHandler[] = [];
  private lockedOn: UIHandler | null = null;
  private cellEditor!: CellEditor;

  constructor(public websheet: OpenDocument, public renderer: DocumentRenderer) {
    this.cellEditor = new CellEditor(this);
    this.addHandlers();
    this.attachEvents();
    websheet.addOnChange(() => this.cellEditor.updateEditorAppearance());
  }

  public select(animation: boolean = true) {
    this.cellEditor.select(animation);
  }

  public deselect() {
    this.cellEditor.deselect();
  }

  public alterColumn(columnId: number, delta: number) {
    this.websheet.execCommand('alter-column', columnId, delta);
  }

  public alterRow(rowId: number, delta: number) {
    this.websheet.execCommand('alter-row', rowId, delta);
  }

  public lock(uiHandler: UIHandler) {
    this.lockedOn = uiHandler;
  }

  public unlock() {
    this.lockedOn = null;
  }

  public resetCursor() {
    this.renderer.Element.style.cursor = '';
  }

  public changeCursor(cursor: string) {
    this.renderer.Element.style.cursor = cursor;
  }

  public attachEvents() {
    const element = this.renderer.Element;
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.zIndex = '9999';
    element.appendChild(overlay);

    const controler = this;

    const getXY = function(evt: MouseEvent) {
      const x = evt.offsetX || evt.layerX || (evt.clientX - element.offsetLeft);
      const y = evt.offsetY || evt.layerY || (evt.clientY - element.offsetTop);

      return {x, y};
    };

    const getTouchXY = function(evt: TouchEvent) {
      const touch = evt.touches.length ? evt.touches[0] : evt.changedTouches[0];
      const x = touch.clientX - element.offsetLeft;
      const y = touch.clientY - element.offsetTop;
      return {x, y};
    };

    overlay.addEventListener('touchstart', (evt: TouchEvent) => {
      if (evt.touches.length == 1) {
        const pos = getTouchXY(evt);
        controler.mouseDown(pos.x, pos.y);
        evt.preventDefault();
      }
    });

    overlay.addEventListener('touchmove', (evt: TouchEvent) => {
        const pos = getTouchXY(evt);
        controler.mouseMove(pos.x, pos.y);
    });

    overlay.addEventListener('touchend', (evt: TouchEvent) => {
        const pos = getTouchXY(evt);
        controler.mouseUp(pos.x, pos.y);
    });

    overlay.addEventListener('touchcancel', (evt: TouchEvent) => {
      const pos = getTouchXY(evt);
      controler.mouseUp(pos.x, pos.y);
    });

    overlay.addEventListener('mousedown', (evt: MouseEvent) => {
      const pos = getXY(evt);
      controler.mouseDown(pos.x, pos.y);
    });

    overlay.addEventListener('mousemove', (evt: MouseEvent) => {
      const pos = getXY(evt);
      controler.mouseMove(pos.x, pos.y);
    });

    overlay.addEventListener('mouseup', (evt: MouseEvent) => {
      const pos = getXY(evt);
      controler.mouseUp(pos.x, pos.y);
    });

    overlay.addEventListener('click', (evt: MouseEvent) => controler.click());
    overlay.addEventListener('dblclick', (evt: MouseEvent) => controler.dblClick());
    overlay.addEventListener('mousewheel', (evt: any) => {
      const dx = evt.wheelDeltaX;
      const dy = evt.wheelDeltaY;
      controler.mouseWheel(dx, dy);
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });

    window.addEventListener('keydown', (evt: any) => controler.keyDown(evt));
    window.addEventListener('keypress', (evt: any) => controler.keyPress(evt));
    window.addEventListener('keyup', (evt: any) => controler.keyUp(evt));
    window.addEventListener('resize', () => this.renderer.resize());

  }

  public click() {
    if (this.lockedOn) {
      this.lockedOn.click();
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].click();
    }
  }

  public dblClick() {
    if (this.lockedOn) {
      this.lockedOn.dblClick();
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].dblClick();
    }
  }

  public mouseDown(x: number, y: number) {
    if (this.lockedOn) {
      this.lockedOn.mouseDown(x, y);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].mouseDown(x, y);
    }
  }

  public mouseMove(x: number, y: number) {
    if (this.lockedOn) {
      this.lockedOn.mouseMove(x, y);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].mouseMove(x, y);
    }
  }

  public mouseUp(x: number, y: number) {
    if (this.lockedOn) {
      this.lockedOn.mouseUp(x, y);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].mouseUp(x, y);
    }
  }

  public mouseWheel(dx: number, dy: number) {
    if (this.lockedOn) {
      this.lockedOn.mouseWheel(dx, dy);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].mouseWheel(dx, dy);
    }
  }

  public keyDown(evt: any) {
    if (this.lockedOn) {
      this.lockedOn.keyDown(evt);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].keyDown(evt);
    }
  }

  public keyPress(evt: any) {
    if (this.lockedOn) {
      this.lockedOn.keyPress(evt);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].keyPress(evt);
    }
  }

  public keyUp(evt: any) {
    if (this.lockedOn) {
      this.lockedOn.keyUp(evt);
      return;
    }

    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].keyUp(evt);
    }
  }

  public changeActiveSheet(index: number) {
    this.cellEditor.deselect();
    this.websheet.ActiveSheetIndex = index;
    this.cellEditor.select(false);
  }

  public commit() {
    this.cellEditor.deselect();
    this.cellEditor.select(false);
  }

  private addHandlers() {
    this.handlers.push(new WebSheetUIHandler(this));
    this.handlers.push(new SheetUIHandler(this));
    this.handlers.push(new ResizeHandler(this));
  }
}
