import { OpenDocument } from './core/Document';
import { DocumentRenderer } from './rendering/DocumentRenderer';
import { CanvasRenderer } from './rendering/canvas/CanvasRendering';
import { UIHandlerController } from './editor/UIHandlerControler';

export class UI {
    
    private handlers = [];
    private document:OpenDocument = new OpenDocument();
    private render:DocumentRenderer= null;
    private uiController: UIHandlerController;
    
    public constructor(private element:HTMLElement) {
        this.render = new CanvasRenderer(element,this.document);
        this.uiController = new UIHandlerController(this.document,this.render);
        this.document.addOnChange(() => this.raiseOnChangeEventListener());
        this.render.render();

        element['openDocument'] = this.document;
    }

    public get SelectedCellLabel () {
        return this.document.ActiveSheet.SelectionLabel;
    }

    public get SelectedValue() {
        return this.document.ActiveSheet.SelectedValue;
    }

    public execCmd(cmd,...args) {
        this.document.execCommand(cmd,...args);
    }

    public addOnChangeEventListener(handler: (doc:OpenDocument) => void) {
        this.handlers.push(handler);
    }

    public removeOnChangeEventListener(handler:(doc:OpenDocument) => void) {
        let ix = this.handlers.indexOf(handler);
        if(ix != -1) {
            this.handlers.splice(ix, 1);
        }
    }

    private raiseOnChangeEventListener() {
        this.handlers.forEach(handler => handler(this.document));
    }

}