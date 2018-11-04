define(["require", "exports", '../lib/UI'], function (require, exports, UI_1) {
    /**
     * Created by SiamandM on 7/21/2016.
     */
    var menu = ['document', 'formatting', 'formula', 'data', 'info'];
    $(document).ready(function () {
        var el = document.getElementById('content');
        var ui = new UI_1.UI(el);
        $('#bold-action').click(function () { return ui.execCmd('bold'); });
        $('#italic-action').click(function () { return ui.execCmd('italic'); });
        $('#underline-action').click(function () { return ui.execCmd('underline'); });
        $('#font-size').change(function () { return ui.execCmd('fontSize', $('#font-size').val()); });
        $('#font-name').change(function () { return ui.execCmd('fontName', $('#font-name').val()); });
        $('#bg-color').change(function () { return ui.execCmd('bgcolor', $('#bg-color').val()); });
        $('#merge-action').click(function () { return ui.execCmd('merge'); });
        $('#unmerge-action').click(function () { return ui.execCmd('unmerge'); });
        $('#left-action').click(function () { return ui.execCmd('align', 'left'); });
        $('#center-action').click(function () { return ui.execCmd('align', 'center'); });
        $('#right-action').click(function () { return ui.execCmd('align', 'right'); });
        $("#header > .menu > li").click(function (evt) {
            var el = evt.target;
            var tg = el.getAttribute('data-for') + "-menu";
            $("#header > .menu > li.active").removeClass('active');
            $("#header > .menu-content > .active").removeClass('active');
            $("#header > .menu-content > ." + tg).addClass('active');
            $(el).addClass('active');
        });
        ui.addOnChangeEventListener(function (doc) {
            $('#selection-input').val(ui.SelectedCellLabel);
            $('#formula-input').val(ui.SelectedValue);
        });
        $('#formula-input').focus(function () { return $('#formula-bar').addClass('active'); });
        $('#formula-input').blur(function () { return $('#formula-bar').removeClass('active'); });
        $('#formula-bar .commit').click(function () { return ui.execCmd('change-value', null, null, $('#formula-input').val()); });
        $('#formula-bar .cancel').click(function () { return $('#formula-input').val(ui.SelectedValue); });
    });
});
