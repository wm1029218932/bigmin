/**
 * Created by wangmin002 on 2017/9/12.
 */
var fs = require('fs');

exports.getAllAlbums = function(callback){
    fs.readdir('./upload',function(err,files){
        if(err){
            callback('没找到uoload文件夹',null);
        }
        console.log(files);
        var allAlbum =[];

        (function iteration(i){
            if(i == files.length){
                callback(null,allAlbum);
                return
            }
            fs.stat('./upload/' +files[i],function(err,stats){
                if(err){
                    callback('读取出错',allAlbum);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbum.push(files[i]);
                }
                iteration(i+1);
            })
        })(0);


    })
};

exports.getAllImages = function(albumName,callback){
    fs.readdir('./upload/' + albumName,function(err,files){
        if(err){
            callback('没找到该相册',null);
            return;
        }
        var allImages = [];
        (function iteration(i){
            if(i == files.length){
                callback(null,allImages);
                return
            }
            fs.stat('./upload/' + albumName + '/' + files[i],function(err,stats){
                if(err){
                    callback('读取图片出错',allImages);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iteration(i+1);
            })
        })(0);

    })
};


