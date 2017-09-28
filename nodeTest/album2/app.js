/**
 * Created by wangmin002 on 2017/9/12.
 */
var express = require('express');
var router = require('./controller/router.js');

var app = express();
app.set('view engine','ejs');
app.use(express.static('./upload'));
app.use(express.static('./public'));


app.get('/',router.showIndex);
app.get('/:albumName',router.showImages);
app.get('/up',router.showUp);
app.post('/up',router.uploadImages);

app.listen(4000);