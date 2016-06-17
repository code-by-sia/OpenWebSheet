/**
 * Created by SiamandM on 6/16/2016.
 */
$(document).ready(function () {
    var el = document.getElementById('content');
    var websheet = new WebSheet(el);
    var sheet = websheet.sheets[0];

    var cell = sheet.getCell(3,4);
    cell.value="Test Data";
    cell.save();

    window.websheet = websheet;


});