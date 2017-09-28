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


//功能  获取浏览器可视区域的宽度和高度
function client() {
    // ie9+ 最新浏览器 ===== window.innerWidth
    //  声明DTD   document.documentElement.clientWidth
    // 怪异模式 document.body.clientWidth
    if(window.innerWidth != null) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if(document.compatMode == "CSS1Compat") {
        return {
            width: document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }

    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}


function $(id) {
    return document.getElementById(id);
}