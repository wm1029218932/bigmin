/**
 * Created by wangmin002 on 2017/9/18.
 */
var express = require('express');
var router = require('./controllers/router.js');


var app = express();


//修改模板引擎为html
//导入ejs
var ejs = require('ejs');
//指定html引擎
app.engine('.html', ejs.__express);
//视图引擎
app.set('view engine','html');


app.use(express.static("public"));

app.get('/',router.showIndex);

app.get('/allStudents',router.getData);

app.get('/add',router.showAdd);

app.post('/add',router.addInfo);

app.listen(4000);