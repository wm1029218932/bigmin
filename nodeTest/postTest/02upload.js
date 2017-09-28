
var http = require("http");
var formidable = require("formidable");
var util = require("util");
var sd = require("silly-datetime");
var path = require("path");
var fs = require("fs");

// 创建服务器
var server = http.createServer(function(req,res) {
   // 假如用户访问是这个地址 并且请求类型为post
   if(req.url == "/doPost" && req.method.toLowerCase() == "post") {
        var form = new formidable.IncomingForm(); 
        // 设置文件上传存放地址
        form.uploadDir = "./upload";

    form.parse(req, function(err, fields, files) {
      if(err) {
      	   throw err;
      }
      console.log(files);
      /*console.log(fields); // 所有的文本域 单选框 都放在fields里 
      console.log(files.tp);// 所有的文件域放在files*/
      /*console.log(util.inspect({fields: fields, files: files}));*/

      
      // 用户上传图片时  放到服务器图片的名字 2017082820563212356
      var tt  = sd.format(new Date(),"YYYYMMDDHHmmss"); // 20170828205632
      var ranNum = parseInt(Math.random()*100000); // 随机数
      var extname = path.extname(files.img.name);
      console.log(extname);
      // 执行改名字
       console.log(__dirname);// 全局变量 光标提示符所在的路径
       var oldpath = __dirname + "/" + files.img.path;
       var newpath = __dirname + "/upload/" + tt+ranNum+extname;
       console.log(oldpath);
       console.log(newpath);  
       fs.rename(oldpath,newpath,function(err) {
       	    if(err) {
       	    	  throw Error("改名失败");
       	    }
       	     res.writeHead(200, {'content-type': 'text/html'}); 
          res.end("ok");
       });
    });
    
   } else if(req.url == "/") {
   	    // 呈递form.html页面
   	    fs.readFile("./form.html",function(err,data) {
   	    	 res.writeHead(200, {'content-type': 'text/html'}); 
             res.end(data);
   	    });
   } else {
   	     res.writeHead(404, {'content-type': 'text/html'}); 
             res.end("NOt found");
   }
});


server.listen(5050,'10.48.48.26');
