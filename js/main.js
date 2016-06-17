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


    var col_B = sheet.getColumn(1);
    col_B.width=150;
    col_B.save();

    var row_2 = sheet.getRow(5);
    row_2.height=40;
    row_2.save();

    window.websheet = websheet;

    var uiControler = new UIHandlerControler(websheet);


});