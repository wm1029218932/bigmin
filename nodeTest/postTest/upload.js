/**
 * Created by wangmin002 on 2017/8/30.
 */
var http = require('http');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var sd = require('silly-datetime');

var server = http.createServer(function(req,res){
    if(req.url == '/doPost' && req.method.toLowerCase() == 'post'){
        var form = new formidable.IncomingForm();

        //设置文件上传路径
        form.uploadDir = './upload';

        //转换请求的表单信息,fileds为字段域信息，files为上传的文件信息
        form.parse(req,function(err,fields,files){
            if(err){
                throw err;
            }

            //上传的文件按时间戳重命名（年月日时分秒+五位随机数）
            var newName = sd.format(new Date(),'YYYYMMDDHHmmss');
            var ranNum = parseInt(Math.random()*100000);
            var extname = path.extname(files.img.name);

            //执行改路径
            var oldpath = __dirname + '/' + files.img.path;
            var newpath = __dirname + '/upload/' + newName+ranNum+extname
            console.log(oldpath);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    throw Error('改名失败！')
                }
                res.writeHead(200, {'content-type': 'text/plain;charset=UTF8'});
                res.end('提交成功!');
            });

        })
    }else if(req.url == '/'){
        fs.readFile('./upload.html',function(err,data){
            res.writeHead(200, {'content-type': 'text/html;charset=UTF8'});
            res.end(data);
        });
    }else{
        res.writeHead(404, {'content-type': 'text/html;charset=UTF8'});
        res.end('404，页面没找到。');
    }
});
server.listen(5050,'10.48.48.26');