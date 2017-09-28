/**
 * Created by wangmin002 on 2017/9/6.
 */
var express = require('express');

var app = express();

app.get('/',function(req,res){
    console.log(123);
    res.send('Hello World');
});

app.listen(4000);