/**
 * Created by wangmin002 on 2017/9/18.
 */
var MongoClient = require('mongodb').MongoClient;


var dburl = 'mongodb://localhost:27017/student';

function getStudents (callback){
    MongoClient.connect(dburl,function(err,db){
        if(err){
            callback('连接数据库失败！',null);
            return;
        }
        db.collection('banji01').find({}).toArray(function(err,results){
            if(err){
                callback('查找数据失败!');
                return;
            }
            callback(null,results);
            db.close();
        })
    });
}
exports.getStudents = getStudents;
