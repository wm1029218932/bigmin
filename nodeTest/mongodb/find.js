/**
 * Created by wangmin002 on 2017/9/18.
 */
var MongoClient = require('mongodb').MongoClient;

var dburl = 'mongodb://localhost:27017/student';

//
MongoClient.connect(dburl,function(err,db){
    if(err){
        console.log('连接数据库失败！');
        return;
    }
    //查找数据库的标准写法
    /*db.collection('banji01').find({'age':24}).toArray(function(err,results){
        if(err){
            console.log('查找数据失败！');
            return;
        }
        console.log(results);
        db.close();
    });*/

    //查找年龄为24，且姓名为mm1的人,逗号是并且的意思

    /*db.collection('banji01').find({'age':24,'name':'mm1'}).toArray(function(err,rusults){
        if(err){
            console.log('查找数据失败！');
            return;
        }
        console.log(rusults);
        db.close();

    });*/

    //查找年龄大于20岁的学生
    /*db.collection('banji01').find({'age' : {$gt : 20}}).toArray(function(err,results){
        if(err){
            console.log('查找数据失败！');
            return;
        }
        console.log(results);
        db.close();
    });*/


    //查找年龄大于20岁,且为男的学生
    /*db.collection('banji01').find({'age' : {$gt : 20},'sex' : 'm'}).toArray(function(err,results){
        if(err){
            console.log('查找数据失败！');
            return;
        }
        console.log(results);
        db.close();
    });*/


    //查找年龄大于20岁的男性或者小于25岁的女性
    db.collection('banji01').find({
        $or:[
                {'age' : {$gt : 20},'sex' : 'm'},
                {'age' : {$lt : 25},'sex' : 'f'}
            ]
    }).toArray(function(err,results){
        if(err){
            console.log('查找数据失败！');
            return;
        }
        console.log(results);
        db.close();
    });

});