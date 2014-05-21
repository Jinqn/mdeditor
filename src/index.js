// markdown解析器
UE.md2html = function(md){
    return window.markdown.toHTML(md);
};
UE.html2md = function(html){
    return window.toMarkdown(html);
};

// 实例化ueditor
var ue1 = UE.getEditor('editor1');
var ue2 = UE.getEditor('editor2');

ue1.ready(function(){

    var preContent = '';

    ue1.addListener('contentchange', function(){
        var md = ue1.getPlainTxt();
        var html = UE.md2html(md);
        ue2.setContent(html);
    });

    ue1.setContent('<p># 标题1【a】</p>' +
        '<p>文本 **文本** 文本 __文本__ 文本 文本</p>' +
        '<p>文本 **文本** 文本 文本 文本 文本</p>' +
        '<p><br/></p>' +
        '<p>## 标题2【b】</p>' +
        '<p>文本 **文本** 文本 **文本** 文本 文本</p>' +
        '<p>文本 文本 文本 文本 文本 文本</p>' +
        '<p><br/></p>' +
        '<p>## 标题2【c】</p>' +
        '<p>| 标题 | 标题 | 标题 |</p>' +
        '<p>| -- | -- | -- |</p>' +
        '<p>| 内容 | 内容 | 内容 |</p>' +
        '<p>| 内容 | 内容 | 内容 |</p>' +
        '<p><br/></p>' +
        '<p>## 标题2【d】</p>' +
        '<p>文本 文本 文本 文本 文本 文本</p>' +
        '<p>文本 文本 文本 文本 文本 文本</p>' +
        '<p>## 标题2【e】</p>' +
        '<p>文本 文本 文本 文本 文本 文本</p>' +
        '<p>文本 文本 文本 文本 文本 文本</p>' +
        '<p>&gt; 【f】文本 文本 文本 文本 文本 文本</p>' +
        '<p>&gt; 文本 文本 文本 文本 文本 文本</p>' +
        '<p>| 标题 | 标题 | 标题 |</p>' +
        '<p>| -- | -- | -- |</p>' +
        '<p>| 内容 | 内容 | 内容 |</p>' +
        '<p>| 内容 | 内容 | 内容 |</p>' +
        '<p><br/></p>' +
        '<p><br/></p>' +
        '<p><br/></p>');
});

function split_blocks(source){
    var m = new markdown.Markdown();
    return m.split_blocks(source);
}