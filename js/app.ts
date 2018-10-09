// import {WebSheet}  from '../lib/WebSheet';
// import {UIHandlerControler} from "../lib/UIHandler";
//import {demo} from './demo';
import {UI} from '../lib/UI';
/**
 * Created by SiamandM on 7/21/2016.
 */
const menu = ['document','formatting','formula','data','info'];

$(document).ready(()=> {

    let el = document.getElementById('content');
    let ui = new UI(el);
    
    // var websheet = new WebSheet(el);
    // var sheet = websheet.sheets[0];
    // let win:any = window;
    // var uiControler = new UIHandlerControler(websheet);
    // win.uicontroler = uiControler;
    // win.websheet = websheet;

    let items= document.querySelectorAll("#toolbar > .menu a.item");
    for(let i=0;i<items.length;i++){        
        items.item(i).addEventListener('click',function (evt:any) {
            let el:HTMLAnchorElement = evt.target;
            document.querySelector("#toolbar > .menu li.active")['className'] = '';
            document.querySelector("#menu-content > div.active")['className'] = '';
            el.parentElement.className ='active';
            document.getElementById(el.getAttribute('for')).className="active";
        });
    }
    
    //demo(sheet);

});


