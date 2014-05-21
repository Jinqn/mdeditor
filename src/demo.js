var ue = UE.getEditor('editor');

ue.ready(function(){

    ue.addListener('afterSetContent', function(){
        var md = ue.getPlainTxt();
        var blocks = split_blocks(md);
        console.log(blocks);
    });

    ue.setContent('<p># 标题1【a】</p>' +
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
        '<p><br/></p>' +
        '<p><br/></p>' +
        '<p><br/></p>');



});

function split_blocks(source){
    var m = new markdown.Markdown();
    return m.split_blocks(source);
}