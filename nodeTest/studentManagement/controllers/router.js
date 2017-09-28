/**
 * Created by wangmin002 on 2017/9/18.
 */
var db = require('../models/db.js');
var formidable = require('formidable');

var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/student';
exports.showIndex = function(req,res){
    db.getStudents(function(err,results){
        if(err){
            console.log(err);
            return;
        }
        res.render('index',{
            'students' : results
        });
    })

};

exports.showAdd = function(req,res){
    res.render('add');
};


//添加数据
exports.addInfo = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        console.log(fields);
        MongoClient.connect(dburl,function(err,db){
            if(err){
                res.send('连接数据库失败！')
            }
            db.collection('banji01').insertOne({
                'name' : fields.name,
                'age' : fields.age,
                'sex' :fields.sex,
                'province' : fields.province
            },function(err,r){
                if(err){
                    res.send('添加数据失败！')
                }
                res.send('成功插入了' + r.insertedCount + '条数据<br/><a href="/">返回首页</a>');
            })
        })
    });

};


