/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'editor.js',
            'core/browser.js',
            'core/utils.js',
            'core/EventBase.js',
            'core/dtd.js',
            'core/domUtils.js',
            'core/Range.js',
            'core/Selection.js',
            'core/Editor.js',
            'core/ajax.js',
            'core/filterword.js',
            'core/node.js',
            'core/htmlparser.js',
            'core/filternode.js',
            'core/plugin.js',
            'core/keymap.js',
            'core/localstorage.js',
            'plugins/paragraph.js',
            'plugins/undo.js',
            'plugins/basestyle.js',
            'plugins/autosave.js',
            'ui/ui.js',
            'ui/uiutils.js',
            'ui/uibase.js',
            'ui/separator.js',
            'ui/mask.js',
            'ui/popup.js',
            'ui/colorpicker.js',
            'ui/tablepicker.js',
            'ui/stateful.js',
            'ui/button.js',
            'ui/splitbutton.js',
            'ui/colorbutton.js',
            'ui/tablebutton.js',
            'ui/autotypesetpicker.js',
            'ui/autotypesetbutton.js',
            'ui/cellalignpicker.js',
            'ui/pastepicker.js',
            'ui/toolbar.js',
            'ui/menu.js',
            'ui/combox.js',
            'ui/dialog.js',
            'ui/menubutton.js',
            'ui/multiMenu.js',
            'ui/shortcutmenu.js',
            'ui/breakline.js',
            'adapter/editorui.js',
            'adapter/editor.js'
        ],
        baseURL = 'src/';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();