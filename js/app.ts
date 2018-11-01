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
    
    $('#bold-action').click(() => ui.execCmd('bold'));
    $('#italic-action').click(() => ui.execCmd('italic'));
    $('#underline-action').click(() => ui.execCmd('underline'));
    $('#font-size').change(() =>  ui.execCmd('fontSize',$('#font-size').val()));
    $('#font-name').change(()=>ui.execCmd('fontName',$('#font-name').val()));

    $("#header > .menu > li").click((evt) => {
        let el = evt.target;
        let tg = `${el.getAttribute('data-for')}-menu`;
        $("#header > .menu > li.active").removeClass('active');
        $(`#header > .menu-content > .active`).removeClass('active');
        $(`#header > .menu-content > .${tg}`).addClass('active');
        $(el).addClass('active');
    })
    
 
    //demo(sheet);

});


