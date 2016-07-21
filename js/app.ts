import {WebSheet}  from '../lib/WebSheet';
import {UIHandlerControler} from "../lib/UIHandler";
/**
 * Created by SiamandM on 7/21/2016.
 */

$(document).ready(()=> {

    let el = document.getElementById('content');
    var websheet = new WebSheet(el);
    var sheet = websheet.sheets[0];

    var cell = sheet.getCell(1, 4);
    cell.value = "Test Data";
    cell.save();

    var cell2 = sheet.getCell(4, 2);
    cell2.value = 'TEST';
    cell2.fill = '#ccc';
    cell2.save();

    var cell3 = sheet.getCell(0, 1);
    cell3.value = "0,0";
    cell3.save();


    var col_B = sheet.getColumn(1);
    //col_B.width=150;
    col_B.save();

    var col_C = sheet.getColumn(2);
    col_C.fill = '#dedede';
    col_C.width = 200;
    col_C.save();

    var col_E = sheet.getColumn(4);
    col_E.width = 150;
    col_E.save();

    var row_2 = sheet.getRow(5);
    row_2.height = 40;
    row_2.save();

    let win:any = window;

    win.websheet = websheet;

    var uiControler = new UIHandlerControler(websheet);
    win.uicontroler = uiControler;

});


