// import {WebSheet}  from '../lib/WebSheet';
// import {UIHandlerControler} from "../lib/UIHandler";
// import {demo} from './demo';
import {UI} from '../lib/UI';
import { OpenDocument } from '../lib/core/Document';
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
    $('#font-name').change(() => ui.execCmd('fontName',$('#font-name').val()));
    $('#bg-color').change(() => ui.execCmd('bgcolor',$('#bg-color').val()))
    $('#merge-action').click(() => ui.execCmd('merge'));
    $('#unmerge-action').click(() => ui.execCmd('unmerge'));
    $('#left-action').click(() => ui.execCmd('align','left'));
    $('#center-action').click(() => ui.execCmd('align','center'));
    $('#right-action').click(() => ui.execCmd('align','right'));

    $("#header > .menu > li").click((evt) => {
        let el = evt.target;
        let tg = `${el.getAttribute('data-for')}-menu`;
        $("#header > .menu > li.active").removeClass('active');
        $(`#header > .menu-content > .active`).removeClass('active');
        $(`#header > .menu-content > .${tg}`).addClass('active');
        $(el).addClass('active');
    });
    
    ui.addOnChangeEventListener((doc) => {
        $('#selection-input').val(ui.SelectedCellLabel);
        $('#formula-input').val(ui.SelectedValue)
    });

    $('#formula-input').focus(() => $('#formula-bar').addClass('active'));
    $('#formula-input').blur(() => $('#formula-bar').removeClass('active'));
    $('#formula-bar .commit').click(() => ui.execCmd('change-value',null,null,$('#formula-input').val()));
    $('#formula-bar .cancel').click(() => $('#formula-input').val(ui.SelectedValue))

});


