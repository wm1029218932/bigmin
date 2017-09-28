/**
 * Created by wangmin002 on 2017/8/31.
 */
var http = require ('http');
var ejs = require('ejs');
var fs = require('fs');

var server = http.createServer(function(req,res){
    fs.readFile('./news.html',function(err,data){
        //将模板转成字符串
        var str = data.toString();

        //定义需要绑定的数据
        var dictionary = {
            news : [
                {
                    'title' : '第一条热点新闻',
                    'counts': '10000'
                },
                {
                    'title' : '第二条热点新闻',
                    'counts': '1000'
                },
                {
                    'title' : '第三条热点新闻',
                    'counts': '1000'
                }
            ]
        };

        //第一个是要绑定的模板字符串，第二个参数是要绑定的数据
        var html = ejs.render(str,dictionary);

        //返回绑定好的页面
        res.writeHead(200,{"Content-type":"text/html;charset=UTF8"});
        res.end(html);
    });
});

server.listen(5050,'10.48.48.26');

