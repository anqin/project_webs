
;(function(){
    // util 
    var template = function(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            template(document.getElementById(str).innerHTML) :
          
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };

    // share 
    $(document).on('click', '[data-item]', function (e) {
        var itemType = $(this).data('item'),
            itemValue = $(this).data('item-value');
        
        if(itemType == 'share'){
            var shareMsg = {
                title: 'Baidu Open Sources, Starting',
                pic: 'http://anqin.github.io/img/slide2.jpg',
                msg: 'Baidu Open Sources, Starting',
                url: 'http://anqin.github.io/'
            };
            var targetUrl = '';
            switch(itemValue){
                case 'weibo':
                    targetUrl = 'http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&title='+shareMsg.title+'&url='+shareMsg.url+'&pic='+shareMsg.pic;
                    break;
                case 'qzone':
                    targetUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=qzone&url='+shareMsg.url+'&title='+shareMsg.title+'&pics='+shareMsg.pic+'&summary='+shareMsg.msg;
                    break;
                case 'sina':
                    targetUrl = 'http://service.weibo.com/share/share.php?url='+shareMsg.url+'&appkey=&title='+shareMsg.title+'&pic='+shareMsg.pic+'&ralateUid=&language=';
                    break;
                case 'pengyou':
                    targetUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+shareMsg.url+'&title='+shareMsg.title+'&pics='+shareMsg.pic+'&summary='+shareMsg.msg;
                    break;

                default:

            }
            window.open(targetUrl);
        }
    });


    // init
    $('.carousel').carousel();

    // render proj
    var list = [{
        url: 'http://anqin.github.io/tera/',
        name: 'Tera',
        img: 'img/proj/jx.png',
        brief: 'Tera: High-throughput Distributed Table Storage',
        intro: 'Tera is a high-throughput distributed table storage, implementing the full-ordered data model and lightweight load balnace based on overhead-less split and merge operations. It can run on current mainstream distributed filesystem (like HDFS).'
    }, {
        url: 'http://anqin.github.io/pbrpc/',
        name: 'pbrpc',
        img: 'img/proj/alloyimage.png',
        brief: 'Sofa-pbrpc: high-performance protobuf-based RPC framework',
        intro: 'A light-weight RPC implement of google protobuf RPC framework.'
    }];
    var data = {
        list: list
    };
    $('#projContainer').html(template($('#projTemplate').html(), data));

    // lozy load
    $('.lazy').unveil();
})();
