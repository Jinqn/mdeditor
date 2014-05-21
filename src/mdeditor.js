/**
 * mdeditor
 */

(function(){

    function MDeditor(id, ue){

        this.UIPREFIX = 'mdui-';
        this.BKCLASS = 'mdui-bk';
        this.BKCLASS = 'mdui-bk';

        this.$container = $('#' + id);
        this.ue = ue;

        this.resetResource();
        this.reset();
    }

    MDeditor.prototype = {
        resetResource: function(){
            this.UIPREFIX = 'mdui-';
            this.BKCLASS = '_ue_bk_';
            this.BKCLASS = '_ue_bk_';
            this.BKIDPREFIXSTART = '_baidu_bookmark_start_';
            this.BKIDPREFIXEND = '_baidu_bookmark_end_';
        },
        reset: function(){
            var me = this;
            me.$container.addClass(me.UIPREFIX + 'container').attr('contenteditable', true);
            me.$body = $('<div>').addClass(me.UIPREFIX + 'body').appendTo(me.$container);

            me.bind();
            me.setHtmlContent(me.getUeHtmlContent());
        },
        bind: function(){
            var me = this;

            /* um选区改变,更新md内容和选区 */
            this.ue.addListener('selectionchange contentchange', function(){
                me.setHtmlContent(me.getUeHtmlContent());
            });

            /* 滚动um,md随着滚动 */
            var scrollFlag = '', scrollTimer;
            $(me.ue.document).on('scroll', function(e){

                if (scrollFlag && scrollFlag != 'ue') return;
                scrollFlag = 'ue';
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function(){
                    scrollFlag = '';
                }, 300);

                var s = e.target || e.srcElement;
                var t = me.$container[0];
                var p = s.scrollTop / (s.scrollHeight - s.offsetHeight);
                t.scrollTop = p * (t.scrollHeight - t.offsetHeight);

            });
            /* 滚动md,um随着滚动 */
            me.$container.on('scroll', function(e){

                if (scrollFlag && scrollFlag != 'md') return;
                scrollFlag = 'md';
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function(){
                    scrollFlag = '';
                }, 300);

                var s = e.target || e.srcElement;
                var t = me.ue.body;
                var p = s.scrollTop / (s.scrollHeight - s.offsetHeight);
                t.scrollTop = p * (t.scrollHeight - t.offsetHeight);

            });

            /* md改变,同步内容到um */
            var keyUpTimer;
            me.$container.on('keydown', function(e){

                clearTimeout(keyUpTimer);
                keyUpTimer = setTimeout(function() {
                    /* 同步内容 */
                    var mdContent = me.$container.find('pre').html();
                    me.setUeMdContent(mdContent);
                    setTimeout(function(){
                        me.$container.focus();
                    }, 50);
                }, 700);

            });

        },
        setUeMdContent: function(mdContent){
            var htmlContent = markdown.toHTML(mdContent);
            htmlContent = UE.utils.html(htmlContent);
            this.setUeHtmlContent(htmlContent);
        },
        setUeHtmlContent: function(htmlContent){
            this.ue.setContent(htmlContent);
        },
        getUeHtmlContent: function(){
            var me = this;
            var ue = me.ue;
            var rng = ue.selection.getRange();
            var bk = rng.createBookmark();

            $(bk.start).addClass(me.BKCLASS);
            $(bk.end).addClass(me.BKCLASS);
            var htmlcontent = ue.getContent();

            rng.moveToBookmark(bk);
            rng.select();

            return htmlcontent;
        },
        setMdContent: function(mdContent){
            var htmlContent = toMarkdown(mdContent);
            this.$body.html('<pre>' + htmlContent + '</pre>');
        },
        getMdContent: function(){
            return this.$body.find('pre').text();
        },
        setHtmlContent: function(htmlContent){
            this.setMdContent(htmlContent);
        },
        setRange: function(){
            var me = this;
            var bks = $('.' + me.BKCLASS);

            $.each(bks, function(k, b){
                var endId, $start, $end;
                var startId = b.attr('id');

                if (startId && startId.indexOf(me.BKIDPREFIXSTART)) {
                    endId = startId.replace('start', 'end');
                    $start = $('span#' + startId, me.$body);
                    $end = $('span#' + endId, me.$body);
                }

            });

            function selectElement(element) {
                if (window.getSelection) {
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    var range = docueent.createRange();
                    range.selectNodeContents(element);
                    sel.addRange(range);
                } else if (document.selection) {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(element);
                    textRange.select();
                }
            }
        },
        getSelection: function(){
            var userSelection;
            if (window.getSelection) { //现代浏览器
                userSelection = window.getSelection();
            } else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面
                userSelection = document.selection.createRange();
            }
            return userSelection;
        }
    };

    window.MDeditor = MDeditor;

})();