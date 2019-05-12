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
        $('#top-border-action').click(function () { return ui.execCmd('top-border', $('#border-color').val()); });
        $('#left-border-action').click(function () { return ui.execCmd('left-border', $('#border-color').val()); });
        $('#cross-border-action').click(function () { return ui.execCmd('cross-border', $('#border-color').val()); });
        $('#right-border-action').click(function () { return ui.execCmd('right-border', $('#border-color').val()); });
        $('#bottom-border-action').click(function () { return ui.execCmd('bottom-border', $('#border-color').val()); });
        $('#border-grid .all').click(function () { return ui.execCmd('full-border', $('#border-color').val()); });
        $('#no-border').click(function () { return ui.execCmd('no-border', '#fafafa'); });
        $('#save-action').click(function () {
            var content = ui.save();
            var uriContent = "data:application/octet-stream," + encodeURIComponent(content);
            var a = document.createElement("a");
            a['download'] = "document.ows";
            a.href = uriContent;
            a.target = "_blank";
            a.click();
        });
        $('#load-action').click(function () {
            if (window['File'] && window['FileReader'] && window['FileList'] && window['Blob']) {
                var f = document.createElement('input');
                f.type = 'file';
                f.accept = '.ows';
                f.addEventListener('change', function (evt) {
                    var file = evt.target['files'][0];
                    var reader = new FileReader();
                    reader.addEventListener('load', function (loadEvt) {
                        var rawData = loadEvt.target['result'];
                        ui.load(rawData);
                    });
                    reader.readAsText(file, 'utf8');
                });
                f.click();
            }
            else {
                alert('The File APIs are not fully supported in this browser.');
            }
        });
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
