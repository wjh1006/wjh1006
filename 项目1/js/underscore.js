// url 地址验证
function isExal(url) {
    var reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    if (reg.test(url)) {
        return true
    } else {
        return false

    }
}
String.prototype.isExal = isExal;



// 2020-12-02 12:12:12
// YYYY-MM-DD hh:mm:ss

function fomat(str) {
    // if(str === undefined) return false
    var date = new Date(str);
    var res = 'YYYY-MM-DD hh:mm:ss'
    var obj = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth(),
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (var x in obj) {
        obj[x] = obj[x] < 10 ? '0' + obj[x] : obj[x]

        var reg = new RegExp(x);
        console.log(reg);

        res = res.replace(reg, obj[x]);

        console.log(res);
    }
    console.log(obj);
    return res
}

fomat()

// 日期格式化处理
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


// 时间戳
// 2020-12-03 11:02:22





// 数组合并 数组去重....