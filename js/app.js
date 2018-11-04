define(["require", "exports", '../lib/UI', '../lib/core/Appearance'], function (require, exports, UI_1, Appearance_1) {
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
        $('#font-size').change(function () { return ui.execCmd('font-size', $('#font-size').val()); });
        $('#font-name').change(function () { return ui.execCmd('font-name', $('#font-name').val()); });
        $('#bg-color').change(function () { return ui.execCmd('bg-color', $('#bg-color').val()); });
        $('#fg-color').change(function () { return ui.execCmd('fg-color', $('#fg-color').val()); });
        $('#merge-action').click(function () { return ui.execCmd(ui.isMerged ? 'unmerge' : 'merge'); });
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
        function toggle(el, className, condition) {
            $(el)[condition ? 'addClass' : 'removeClass'](className);
        }
        ui.addOnChangeEventListener(function (doc) {
            $('#selection-input').val(ui.SelectedCellLabel);
            $('#formula-input').val(ui.SelectedValue);
            var app = ui.SelectedAppearance;
            toggle('#bold-action', 'on', app.bold);
            toggle('#italic-action', 'on', app.italic);
            toggle('#underline-action', 'on', app.underline);
            toggle('#right-action', 'on', app.textAlign == Appearance_1.TextAlign.Right);
            toggle('#center-action', 'on', app.textAlign == Appearance_1.TextAlign.Center);
            toggle('#left-action', 'on', app.textAlign == Appearance_1.TextAlign.Left);
            $('#bg-color').val(app.background);
            $('#fg-color').val(app.text);
            $('#font-size').val(app.fontSize);
            $('#font-name').val(app.fontName);
            toggle('#merge-action', 'on', ui.isMerged);
        });
        $('#formula-input').focus(function () { return $('#formula-bar').addClass('active'); });
        $('#formula-input').blur(function () { return $('#formula-bar').removeClass('active'); });
        $('#formula-bar .commit').click(function () { return ui.execCmd('change-value', null, null, $('#formula-input').val()); });
        $('#formula-bar .cancel').click(function () { return $('#formula-input').val(ui.SelectedValue); });
    });
});
