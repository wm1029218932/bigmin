/**
 * Created by wangmin002 on 2017/9/6.
 */
var fs = require('fs');

exports.getAllAlbums = function(callback){
    fs.readdir('./upload',function(err,files){
        if(err){
            callback('没找到该文件夹',null);
            return;
        }
        var allAlbums = [];
        (function iterator(i){
            if(i == files.length){
                callback(null,allAlbums);
                return;
            }

            fs.stat('./upload/'+files[i],function(err,stats){
                if(err){
                    callback('找不到文件',null);
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);

    })
};

exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir('./upload/' + albumName,function(err,files){
        if(err){
            callback('没找到该文件夹',null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                console.log(allImages);
                callback(null,allImages);
                return;
            }

            fs.stat('./upload/' + albumName + '/' + files[i],function(err,stats){
                if(err){
                    callback('找不到文件',null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);

    })
};



