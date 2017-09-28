/**
 * Created by wangmin002 on 2017/9/15.
 */
//引入Mongodb
var MongoClient = require('mongodb').MongoClient;

//Mongodb的端口号和数据库名称
var dburl = "mongodb://localhost:27017/student";

//连接数据库
MongoClient.connect(dburl,function(err,db){
    if(err){
        console.log('链接数据库失败！');
        return;
    }
    console.log('success');
    //插入单条数据
/*
    db.collection('banji01').insertOne(
        {
            'name' : 'wangmin002',
            'age' : 18,
            'sex' : 'f'
        },function(err,r){
            if(err){
                console.log('插入数据失败！');
                return;
            }
            console.log('成功插入了' + r.insertedCount + '数据');
            db.close();
        }
    );
*/

    //插入多条数据
    db.collection('banji01').insertMany([
        {
            'name' : '王敏',
            'age' : 20,
            'sex' : 'm',
            'province' : '安徽'
        },
        {
            'name' : '王大敏',
            'age' : 30,
            'sex' : 'f',
            'province' : '浙江'
        },
        {
            'name' : '王大敏子',
            'age' : 24,
            'sex' : 'm',
            'province' : '上海'
        }],function(err,r){
            if(err){
                console.log('插入数据失败！');
                return;
            }
            console.log('成功插入了' + r.insertedCount + '数据');
            db.close();
        }
    );
});