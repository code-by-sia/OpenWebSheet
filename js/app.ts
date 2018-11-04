// import {WebSheet}  from '../lib/WebSheet';
// import {UIHandlerControler} from "../lib/UIHandler";
// import {demo} from './demo';
import {UI} from '../lib/UI';
import { OpenDocument } from '../lib/core/Document';
import { TextAlign } from '../lib/core/Appearance';
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
    $('#font-size').change(() =>  ui.execCmd('font-size',$('#font-size').val()));
    $('#font-name').change(() => ui.execCmd('font-name',$('#font-name').val()));
    $('#bg-color').change(() => ui.execCmd('bg-color',$('#bg-color').val()))
    $('#fg-color').change(() => ui.execCmd('fg-color',$('#fg-color').val()))
    $('#merge-action').click(() => ui.execCmd(ui.isMerged?'unmerge':'merge'));
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
    
    function toggle(el,className ,condition:boolean) {
        $(el)[condition ? 'addClass':'removeClass'](className);
    }

    ui.addOnChangeEventListener((doc) => {
        $('#selection-input').val(ui.SelectedCellLabel);
        $('#formula-input').val(ui.SelectedValue);
        const app = ui.SelectedAppearance;

        toggle('#bold-action', 'on', app.bold);
        toggle('#italic-action', 'on', app.italic);
        toggle('#underline-action', 'on', app.underline);

        toggle('#right-action','on',app.textAlign == TextAlign.Right);
        toggle('#center-action','on',app.textAlign == TextAlign.Center);
        toggle('#left-action','on',app.textAlign == TextAlign.Left);

        $('#bg-color').val(app.background);
        $('#fg-color').val(app.text);

        $('#font-size').val(app.fontSize);
        $('#font-name').val(app.fontName);

        toggle('#merge-action','on', ui.isMerged);
        
    });

    $('#formula-input').focus(() => $('#formula-bar').addClass('active'));
    $('#formula-input').blur(() => $('#formula-bar').removeClass('active'));
    $('#formula-bar .commit').click(() => ui.execCmd('change-value',null,null,$('#formula-input').val()));
    $('#formula-bar .cancel').click(() => $('#formula-input').val(ui.SelectedValue))

});


