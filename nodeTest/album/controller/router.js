/**
 * Created by wangmin002 on 2017/9/6.
 */
var file = require('../models/file.js');
var formidable = require('formidable');
var sd = require('silly-datetime');
var path = require('path');
var fs = require('fs');

exports.showIndex = function(req,res,next){
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            next();
            return;
        }
        res.render('index',{
            "albums" : allAlbums
        })
    })
};


exports.showAlbum = function(req,res,next){
    var xiangce = req.params.albumName;
    console.log(xiangce);
    file.getAllImagesByAlbumName(xiangce,function(err,imagesArray){
        console.log(imagesArray);
        if(err){
            next();
            return;
        }
        res.render('album',{
            'albumName':xiangce,
            'images':imagesArray
        })
    })
};

exports.showUp = function(req,res){
    file.getAllAlbums(function(err,allAlbums){
        res.render('up',{
            'albums':allAlbums
        })
    })
};

exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/../upload';
    form.parse(req,function(err,fields,files,next){
        if(err){
            next();
            return
        }

        //上传的文件按时间戳重命名（年月日时分秒+五位随机数）
        var newName = sd.format(new Date(),'YYYYMMDDHHmmss');
        var ranNum = parseInt(Math.random()*100000);
        var extname = path.extname(files.pic.name);

        //执行改路径
        var oldpath = files.pic.path;
        var newpath =path.normalize(__dirname + '/../upload/' + fields.wenjianjia + '/' + newName+ranNum+extname);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                throw Error('改名失败！')
            }
            res.send('提交成功!');
        });

    })

};
