/**
 * Created by wangmin002 on 2017/9/18.
 */
var express = require('express');
var router = require('./controllers/router.js');

var app = express();

app.set('view engine','ejs');

app.get('/',router.showIndex);

app.get('/add',router.showAdd);

app.post('/add',router.addInfo);

app.listen(4000);