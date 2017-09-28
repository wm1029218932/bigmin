// nodejs实现静态资源文件管理
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var server = http.createServer(function(req,res) {
      // 只要用户发出请求 回调函数就执行
      // 用req.url来判断 
      //  127.0.01:4000/aaa/1.html?name='zxl'#demo
      var  pathname = url.parse(req.url).pathname;

      // 判断此时用户输入的地址是文件夹地址还是文件地址
      // 假如是文件 直接读取 返回到客户端  假如是文件夹 希望访问该文件夹的首页 index.html
      // 127.0.01:4000/aaa

      // 用户输入的网址是  127.0.0.1:3000/images/a.png 
        // 我们假定static 就是我们的根目录
      if(pathname.indexOf(".") == -1) {
      	    pathname = pathname + "/index.html";
      }

      // 实际请求的是  ./static/images/a.png
      var fileUrl = "./"+path.normalize("demo/"+pathname);

      // 得到拓展名
      var extname = path.extname(pathname);
      fs.readFile(fileUrl,function(err,data) {
      	   // 读完文件之后的事情
      	   if(err) {
                // 文件不存在
                res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                res.end("404 文件找不到");
                return;
      	   }
           
           getMime(extname,function(mime) {
           	     res.writeHead(200,{"Content-type":mime});
           	     res.end(data);
           }); 

      });

});

server.listen(4040,"10.48.48.26");

function getMime(extname,callback) {
     // 读取mime.json文件 得到json 根据extname key 返回对应的value
     fs.readFile("./demo/mime.json",function(err,data) {
     	   if(err) {
     	   	    throw Error("找不到mime.json文件！");
     	   	    return;
     	   }

     	   // 转成json
     	   var mimeJson = JSON.parse(data);
     	   //console.log(mimeJson);
     	   var mime = mimeJson[extname] || "text/plain";
     	   //执行回调函数 mimez作为它的参数
     	   callback(mime);

     });      
}

