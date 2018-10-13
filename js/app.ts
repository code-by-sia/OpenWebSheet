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
    

    let items = document.querySelectorAll("#header > .menu > li");
    for(let i=0;i<items.length;i++){        
        items.item(i).addEventListener('click',function (evt:any) {
            let el:HTMLElement = evt.target;
            let tg = `${el.getAttribute('data-for')}-menu`;
            document.querySelector("#header > .menu > li.active")['className'] = '';
            document.querySelector(`#header > .menu-content > .active`).classList.remove('active');
            document.querySelector(`#header > .menu-content > .${tg}`).classList.add('active');
            el.className ='active';
        });
    }
    
    //demo(sheet);

});


