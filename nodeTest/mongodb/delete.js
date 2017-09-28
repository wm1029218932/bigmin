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
     /*db.collection('banji01').deleteOne(
         {
             'name' : 'dali'
         },function(err,r){
             if(err){
             console.log('删除数据失败！');
             return;
         }
         console.log('成功删除了' + r.deletedCount + '数据');
            db.close();
         }
     );*/

    //插入多条数据
    db.collection('banji01').deleteMany(
        {
            'age' : 30
        },function(err,r){
            if(err){
                //throw Error(err);
                console.log('删除数据失败！');
                return;
            }
            console.log('成功删除了' + r.deletedCount + '数据');
            db.close();
        }
    );
});