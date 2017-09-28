/**
 * Created by wangmin002 on 2017/8/30.
 */
var http = require('http');
var querystring = require('querystring')
var util = require('util')

var server = http.createServer(function(req,res){
    var post = '';
    req.on('data',function(chunk){
        post += chunk;
    });
    req.on('end',function(){
        post = querystring.parse(post);
        res.writeHead(200,{'Content-type':'text/html;charset=UTF8'});
        //将对象转换成字符串
        res.end(util.inspect(post));

    });
});
server.listen(5050,'10.48.48.26');