/**
 * Created by wangmin002 on 2017/9/18.
 */

// 功能 可以获取页面被卷的竖直方向和水平方向的距离
function scroll() {
    //ie9+和最新浏览器支持
    if(window.pageXOffset != null){
        return {
            left : pageXOffset,
            top : pageYOffset
        }
    }else if(document.compatMode == 'CSSCompat'){
        // 声明DTD
        return {
            left : document.documentElement.offsetLeft,
            top : document.documentElement.offsetHeight
        }
    }
    // 剩下的没有声明DTD
    return {
        left : document.body.scrollLeft,
        top : document.body.scrollHeight
    }
}

function $(id) {
    return document.getElementById(id);
}