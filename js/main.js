/**
 * Created by SiamandM on 6/16/2016.
 */
$(document).ready(function () {
    var el = document.getElementById('content');
    var websheet = new WebSheet(el);
    var sheet = websheet.sheets[0];

    var cell = sheet.getCell(1,4);
    cell.value="Test Data";
    cell.save();

    var cell2 = sheet.getCell(4,2);
    cell2.value='TEST';
    cell2.fill ='#ccc';
    cell2.save();


    var col_B = sheet.getColumn(1);
    col_B.width=150;
    col_B.save();

    var col_D = sheet.getColumn(2);
    col_D.fill='#dedede';
    col_D.save();

    var row_2 = sheet.getRow(5);
    row_2.height=40;
    row_2.save();

    window.websheet = websheet;

    var uiControler = new UIHandlerControler(websheet);


});