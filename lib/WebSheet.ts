///<reference path="Context.ts"/>
///<reference path="Sheet.ts"/>
/**
 * Created by SiamandM on 6/16/2016.
 */
class WebSheet {

    private element:HTMLElement;
    private canvas:HTMLCanvasElement;
    private renderId:number=0;

    public width:number;
    public height:number;
    public sheets:Sheet[]=[];


    constructor(element:HTMLElement){
        this.element = element;
        this.initialize();
    }

    initialize(){
        this.createElements();
        this.addDefaultItems();
        this.resize();
        this.render();
    }

    addDefaultItems(){
        let sheet1 = new Sheet(this);
        sheet1.title="Sheet 1";
        sheet1.active=true;

        let sheet2 = new Sheet(this);
        sheet2.title="Sheet 2";


        this.sheets.push(sheet1);
        this.sheets.push(sheet2);
    }

    createElements(){
        this.canvas = document.createElement("canvas");
        this.element.appendChild(this.canvas);
    }

    resize() {
        let pixelRatio = window.devicePixelRatio;
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        if (pixelRatio > 1){
            this.canvas.width = this.width * pixelRatio;
            this.canvas.height = this.height * pixelRatio;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
        }else{
            this.canvas.width=this.width;
            this.canvas.height = this.height;
        }
    }

    get_context2D() {
        let pixelRatio = window.devicePixelRatio;
        this.canvas.width = this.canvas.width;
        let context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        context.scale(pixelRatio, pixelRatio);
        return context;
    }

    render(){
        this.renderId = this.renderId + 1;
        let renderId = this.renderId;
        let webSheet = this;

        setTimeout(function(){
            if(renderId==webSheet.renderId){
                webSheet.doRender();
            }
        },10);
    }

    doRender(){
        let context2d = this.get_context2D();
        let context = new Context(context2d,this.width,this.height);

        let tabStroke = '#ccc';
        let tabBar = '#eee';
        let tabFill = '#fff';
        let tabActiveStroke = '#327bcc';

        context.strokeStyle=tabStroke;
        context.rect(0,this.height-30,this.width,30);
        context.fillStyle=tabBar;
        context.fillRect(0,this.height-30,this.width,30);
        context.fillStyle=tabFill;

        let x=30;
        for(let i in this.sheets){
            let sheet = this.sheets[i];
            let width = context.get_textWidth(sheet.title);

            context.strokeStyle = tabStroke;
            context.strokeSize=1;
            context.rect(x,this.height-30,width + 30,25);
            context.fillRect(x,this.height-30,width + 30,25);

            if(sheet.active){
                sheet.render(context);
                context.fontStyle='bold';

                context.strokeStyle =tabFill;
                context.line(x,this.height-30,width + 60,this.height-30);

                context.strokeStyle =tabActiveStroke;
                context.strokeSize = 2;
                context.line(x,this.height-5,width + 60,this.height-5);
            }else{
                context.fontStyle='';
            }

            context.textAlign=TextAlignment.Center;
            context.fillText(sheet.title,x,this.height-26,width + 30) ;
            x+=width + 35;
        }


    }


}