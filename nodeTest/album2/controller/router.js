/**
 * Created by wangmin002 on 2017/9/12.
 */
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var file = require('../module/file.js');

exports.showIndex = function(req,res){
    file.getAllAlbums(function(err,allAlbum){
        if(err){
            res.send(err);
            return;
        }
        res.render('index',{
            'albums' : allAlbum
        })
    });

};

exports.showImages = function(req,res,next){
    var albumName = req.params.albumName;
    console.log(albumName);
    file.getAllImages(albumName,function(err,allImages){
        if(err){
            next();
            return;
        }
        res.render('album',{
            'albumName' : albumName,
            'images' : allImages
        })
    })

};


exports.showUp = function(req,res){
    file.getAllAlbums(function(err,allAlbum){

        res.render('up',{
            'albums' : allAlbum
        })
    })
};

exports.uploadImages = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = './upload';
    console.log(__dirname);
    form.parse(req,function(err,fields,files){
        oldpath = files.pic.path;
        newpath = path.normalize('./upload/' + fields.wenjianjia + '/' + files.pic.name);
        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send('改名失败');
                return;
            }
            res.send('提交成功！');
        })
    });

};