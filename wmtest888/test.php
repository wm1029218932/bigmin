<?php
session_start();
require_once "jssdk.php";
$jssdk = new JSSDK("wx869b5e2326767aed", "d2d6f03e1490ccf9b24f3f2e0da886d2");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <title>微信测试</title>
</head>
<style type="text/css">
    .wrapper{
        width:96%;
        height:auto;
        overflow: hidden;
        margin:0 auto;
        border:2px solid #7FD8BE;
        border-radius: 8px;
        background: #7FD8BE;
        margin:10px 0;
    }
    .wrapper .title{
        height:40px;
        line-height: 40px;
        background: #7FD8BE;
        color:#ffffff;
        text-align: center;
        font-size:20px;

    }
    .wrapper .content{
        height: auto;
        padding:10px;
        background: #ffffff;
    }
    .showImg{
        width:100%;
        background: #ffffff;
        overflow: hidden;
    }
    .showImg img{
        width:48%;
        float:left;
        margin:0 1% 10px;
    }
    .btn{
        background: #7FD8BE;
        color:#ffffff;
        border-radius: 8px;
        border:0;
        padding:10px 0;
        font-size:18px;
    }
    .btn:active{
        background: #50A58C;
    }
    .button-large{
        width:100%;
        margin:10px auto;
    }
    .button-middle{
        width:47%;
        margin:10px 1%;
        display: inline-block;
    }
    .button-small{
        width:30%;
        margin:10px 1%;
        display: inline-block;
    }
    #closeWindow{
        position: fixed;
        bottom:20px;
        right:20px;
        width:50px;
        height:50px;
        line-height: 50px;
        background: #000;
        opacity: .6;
        border-radius: 50%;
        text-align: center;
        color:#ffffff;
    }
</style>
<body>
<div class="wrapper">
    <div class="title">选择照片</div>
    <div class="content">
    	<button id="chooseImg" class="btn button-large">选择照片</button>
        <div class="showImg"></div>
    </div>
</div>
<div class="wrapper">
    <div class="title">录音功能</div>
    <div class="content">
        <button id="startRecord" class="btn button-small">开始录音</button>
        <button id="stopRecord" class="btn button-small">停止录音</button>
        <button id="playVoice" class="btn button-small">播放录音</button>
    </div>
</div>
<div class="wrapper">
    <div class="title">获取网络状态</div>
    <div class="content">
        <button id="getNetworkType" class="btn button-large">获取网络状态</button>
    </div>
</div>
<div class="wrapper">
    <div class="title">查看地图</div>
    <div class="content">
        <button id="openLocation" class="btn button-large">查看您所在的位置</button>
    </div>
</div>

<div id="closeWindow">退出</div>

<div class="wrapper">
    <div class="title">隐藏和打开菜单</div>
    <div class="content">
        <button id="hideOptionMenu" class="btn button-middle">隐藏菜单</button>
        <button id="showOptionMenu" class="btn button-middle">打开菜单</button>
    </div>
</div>
<div class="wrapper">
    <div class="title">扫一扫</div>
    <div class="content">
        <button id="scanQRCode" class="btn button-large">扫一扫</button>
    </div>
</div>
</body>


<script type="text/javascript" src="640/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script>
    // lxt test  注意：所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
    // 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
    // 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
    var $url='http://wmtest888.applinzi.com/';
    wx.config({
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp:<?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList:[
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'startRecord',
            'stopRecord',
            'playVoice',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',

        // 所有要调用的 API 都要加到这个列表中
        ]
    });
    
    wx.ready(function(){
        /*分享至朋友圈接口*/
        wx.onMenuShareTimeline({
            title: '这是一个测试分享', // 分享标题
            desc:'我的微信分享接口测试信息详细描述',// 分享描述
            link: $url+'750/index.html', // 分享链接
            imgUrl: $url+'640/images/icon_05.gif', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('分享成功啦！')
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('您取消了分享')
            }
        });
        
        /*分享给朋友*/
        wx.onMenuShareAppMessage({
            title: '这是分享给朋友的测试', // 分享标题
            desc: '测试描述', // 分享描述
            link: $url+'video/test.mp4', // 分享链接
            imgUrl: $url+'images/icon_05.gif', // 分享图标
            type: 'video', // 分享类型,music、video或link，不填默认为link
            dataUrl: $url+'video/test.mp4', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
                alert('分享成功啦！')
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                alert('您取消了分享')
            }
        });


        $('#chooseImg').on('touchend',function(){
            /*上传图片*/
            wx.chooseImage({
                count:9, // 默认9
                sizeType:['original','compressed'],// 可以指定是原图还是压缩图，默认二者都有
                sourceType:['album','camera'],// 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    $('.showImg').children('img').remove();
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    for (var i=0;i<localIds.length;i++){
                        var $img='<img src="'+localIds[i]+'"/>'
                        $('.showImg').append($img);
                        $('#chooseImg').text('重新选择');
                    };
                }
            });
            return false;
        });

        /*开始录音*/
        $('#startRecord').on('touchend',function(){
            wx.startRecord();
            return false;
        });
        /*停止录音*/
        $('#stopRecord').on('touchend',function(){
            wx.stopRecord({
                success: function (res) {
                    localId = res.localId;
                }
            });
            return false;
        });
        /*播放*/
        $('#playVoice').on('touchend',function(){
            wx.playVoice({
                localId:localId
            });
            wx.onVoicePlayEnd({
                success: function (res) {
                    var localId = res.localId; // 返回音频的本地ID
                    alert(localId+'已经播放完成啦')
                }
            });
            return false;
        });

        /*获取网络状态*/
        $('#getNetworkType').on('touchend',function(){
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    alert('您当前使用的网络是'+networkType);
                }
            });
            return false;
        });


        /*获取地理位置*/
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
            },
            cancel:function(){
                alert('您拒绝获取地理位置')
            }
        });
       
        /*打开地图*/
        $('#openLocation').on('touchend',function(){
            wx.openLocation({
                latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                name: '同盛大厦', // 位置名
                address: '同盛大厦17层', // 地址详情说明
                scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
            
            
            return false;
        });

        /*隐藏右上角菜单*/
        $('#hideOptionMenu').on('touchend',function(){
            wx.hideOptionMenu({});
            return false;
        });
        

        /*显示右上角菜单接口*/
        $('#showOptionMenu').on('touchend',function(){
            wx.showOptionMenu({});
            return false;
        });


        /*关闭当前页面*/
        $('#closeWindow').on('touchend',function(){
            wx.closeWindow({});
        });


        /*微信扫一扫*/
        $('#scanQRCode').on('touchend',function(){
            wx.scanQRCode({
                needResult:0,// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"],// 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    alert(result);
                }
            });
            return false;
        });

    });
    


    wx.error(function(res){
    alert(res.errMsg)
    });
</script>
</html>