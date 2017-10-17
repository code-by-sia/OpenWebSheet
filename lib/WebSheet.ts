///<reference path="Context.ts"/>
///<reference path="Sheet.ts"/>

import {Sheet} from "./Sheet";
import {Context,TextAlignment} from "./Context";
/**
 * Created by SiamandM on 6/16/2016.
 */

export class WebSheet {

    private canvas:HTMLCanvasElement;
    private rendering:boolean=false;
    private renderFrameRate:number=10;//FPS

    public width:number;
    public height:number;
    public sheets:Sheet[] = [];

    public static SheetTitleHeight:number = 30;

    constructor(public element:HTMLElement) {
        this.initialize();
    }

    initialize() {
        this.createElements();
        this.addDefaultItems();
        this.resize();
        this.render();
    }

    addDefaultItems() {
        let sheet1 = new Sheet(this);
        sheet1.title = "Sheet 1";
        sheet1.active = true;

        let sheet2 = new Sheet(this);
        sheet2.title = "Sheet 2";


        this.sheets.push(sheet1);
        this.sheets.push(sheet2);
    }

    createElements() {
        this.canvas = document.createElement("canvas");
        this.element.appendChild(this.canvas);
    }

    setActiveSheet(sheet:Sheet) {
        for (let i = 0; i < this.sheets.length; i++) {
            this.sheets[i].active = (this.sheets[i] == sheet)
        }

        this.render();
    }

    resize() {
        let pixelRatio = window.devicePixelRatio;
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        if (pixelRatio > 1) {
            this.canvas.width = this.width * pixelRatio;
            this.canvas.height = this.height * pixelRatio;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
        } else {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        this.render();
    }

    getActiveSheet() {
        for (let i = 0; i < this.sheets.length; i++) {
            if (this.sheets[i].active) {
                return this.sheets[i];
            }
        }
    }

    get_context2D() {
        let pixelRatio = window.devicePixelRatio;
        this.canvas.width = this.canvas.width;
        let context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        context.scale(pixelRatio, pixelRatio);
        return context;
    }

    render() {
      if(this.rendering){
        return;
      }

      this.rendering = true;
      setTimeout(()=>{
        this.doRender();
        this.rendering=false;
      },1000 / this.renderFrameRate);

    }

    doRender() {
        console.log('%cRender','color:#7cf');

        let context2d = this.get_context2D();
        let context = new Context(context2d, this.width, this.height);

        let tabStroke = '#ccc';
        let tabBar = '#eee';
        let tabFill = '#fff';
        let tabActiveStroke = '#327bcc';


        context.fillStyle = tabBar;
        context.fillRect(0, this.height - WebSheet.SheetTitleHeight, this.width, WebSheet.SheetTitleHeight);
        context.strokeStyle = tabStroke;
        context.strokeSize = 1;
        context.rect(0, this.height - (WebSheet.SheetTitleHeight - .5), this.width, WebSheet.SheetTitleHeight);
        context.fillStyle = tabFill;

        let x = WebSheet.SheetTitleHeight;
        for (let i in this.sheets) {
            let sheet = this.sheets[i];
            let width = context.get_textWidth(sheet.title);

            context.fillStyle = tabFill;
            context.strokeStyle = tabStroke;
            context.strokeSize = 1;

            let x1 = x;
            let y1 = this.height - WebSheet.SheetTitleHeight + .5;
            let rWidth = width + WebSheet.SheetTitleHeight;
            let rHeight = WebSheet.SheetTitleHeight - 5;

            context.rect(x1, y1, rWidth, rHeight);
            context.fillRect(x1, y1, rWidth, rHeight);

            sheet.tabWidth = rWidth;

            if (sheet.active) {
                sheet.render(context);
                context.fontStyle = 'bold';
                context.strokeStyle = tabFill;
                context.line(x1, y1, x1 + rWidth, y1);

                context.strokeStyle = tabActiveStroke;
                context.strokeSize = 2;
                context.line(x1, y1 + rHeight, x1 + rWidth, y1 + rHeight);
            } else {
                context.fontStyle = '';
            }

            context.textAlign = TextAlignment.Center;
            context.fillText(sheet.title, x, this.height - WebSheet.SheetTitleHeight + 4, width + WebSheet.SheetTitleHeight);
            x += width + WebSheet.SheetTitleHeight + 5;
        }

        context = void 0;
        context2d = void 0;
    }


}
