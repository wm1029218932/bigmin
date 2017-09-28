/**
 * Created by wangmin002 on 2017/8/22.
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(req, res) {
	/*获取请求url的pathname*/
	var pathname = url.parse(req.url).pathname;

	/*获取请求文件的扩展名*/
	var extname = path.extname(pathname);

	/*如果直接输入文件名，默认去该文件下找index.html*/
	if (req.url.indexOf('.') == -1){
		pathname = pathname + '/index.html';
	}

	/*实际请求的地址*/
	var fileurl = './'+path.normalize('demo/' + pathname);

	fs.readFile(fileurl,function(err,data){
		/*如果文件不存在，则显示404页面*/
		if(err){
			fs.readFile('./demo/404.html',function(err,data){
				res.writeHead(404,{'Content-type':'text/html;charset=UTF8'});
				res.end(data);
			});
			return;
		};
		console.log(pathname);
		getMime(extname,function(mime){
			res.writeHead(200,{'Content-type': mime });
			res.end(data);
		});

	});

});
server.listen(4000, '10.48.48.26');

/*获取类型函数*/
function getMime(extname,callback) {
	fs.readFile('./demo/mime.json',function(err,data){
		//如果出现错误，抛出异常
		if(err){
			throw Error('mime.json没找到');
		}
		var mimeJson = JSON.parse(data);
		var mime = mimeJson[extname] || 'text/html';
		callback(mime);
	});

};


