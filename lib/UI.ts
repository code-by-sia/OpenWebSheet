import { OpenDocument } from './core/Document';
import { DocumentRenderer } from './rendering/DocumentRenderer';
import { CanvasRenderer } from './rendering/canvas/CanvasRendering';
import { UIHandlerController } from './editor/UIHandlerControler';

export class UI {
    private document:OpenDocument = new OpenDocument();
    private render:DocumentRenderer= null;
    private uiController: UIHandlerController;

    public constructor(private element:HTMLElement) {
        this.render = new CanvasRenderer(element,this.document);
        this.uiController = new UIHandlerController(this.document,this.render);
        this.render.render();

        element['openDocument'] = this.document;
    }

    public execCmd(cmd,...args){
        this.document.execCommand(cmd,...args);
    }

}