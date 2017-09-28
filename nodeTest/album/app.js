/**
 * Created by wangmin002 on 2017/9/6.
 */
var express = require('express');
var router = require('./controller')

var app = express();

//设置模板引擎为ejs
app.set('view engine','ejs');


//设置静态页面路由服务
app.use(express.static('./public'));
app.use(express.static('./upload'));


app.get('/',router.showIndex);
app.get('/:albumName',router.showAlbum);
app.get('/up',router.showUp);
app.post('/up',router.doPost);


app.listen(4000);