/**
 * Created by cailiang on 2017/9/2.
 */
var Toast = require('react-native-toast');

var VKUtils = {
    codes: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
};
VKUtils.showToast = function (msg) {
    Toast.hide();
    Toast.show(msg);
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//
Array.prototype.contain = function(obj) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            return true
        }
    }
    return false
};
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
String.prototype.add = function (b) {
    let c = Number(this);
    let d = c.add(b);
    return d;
}
String.prototype.sub = function (b) {
    let c = Number(this);
    let d = c.sub(b);
    return d;
}
String.prototype.mul = function (b) {
    let c = Number(this);
    let d = c.mul(b);
    return d;
}
String.prototype.div = function (b) {
    let c = Number(this);
    let d = c.div(b);
    return d;
}
Number.prototype.add = function (b) {
    var c, d, e;
    try {
        c = this.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }

    e = Math.pow(10, Math.max(c, d));
    return (this.mul(e) + b.mul(e))/e;
};
Number.prototype.sub = function (b) {
    var c, d, e;
    try {
        c = this.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));

    return (this.mul(e) - b.mul(e))/e;
};
Number.prototype.mul = function (b) {
    var c = 0,
        d = this.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
};
Number.prototype.div = function (b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = this.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    c = Number(this.toString().replace(".", ""));
    d = Number(b.toString().replace(".", ""));
    return (c/d).mul(Math.pow(10, f - e));
};

function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
}

VKUtils.base64Encode = function (input) {
    var codes = VKUtils.codes;
    var inputlen = input.length;
    input = input.split("");
    var out = '';
    var b = '';
    for (var i = 0; i < inputlen; i += 3) {
        b = (input[i].charCodeAt() & 0xFC) >> 2;
        out += (codes[b]);
        b = (input[i].charCodeAt() & 0x03) << 4;
        if (i + 1 < inputlen) {
            b |= (input[i + 1].charCodeAt() & 0xF0) >> 4;
            out += (codes[b]);
            b = (input[i + 1].charCodeAt() & 0x0F) << 2;
            if (i + 2 < inputlen) {
                b |= (input[i + 2].charCodeAt() & 0xC0) >> 6;
                out += (codes[b]);
                b = input[i + 2].charCodeAt() & 0x3F;
                out += (codes[b]);
            } else {
                out += (codes[b]);
                out += ('=');
            }
        } else {
            out += (codes[b]);
            out += ("==");
        }
    }

    return out;
};
VKUtils.byte64Encode = function (input) {
    var codes = VKUtils.codes;
    var inputlen = input.length;
    var out = '';
    var b = '';
    for (var i = 0; i < inputlen; i += 3) {
        b = (input[i] & 0xFC) >> 2;
        out += (codes[b]);
        b = (input[i] & 0x03) << 4;
        if (i + 1 < inputlen) {
            b |= (input[i + 1] & 0xF0) >> 4;
            out += (codes[b]);
            b = (input[i + 1] & 0x0F) << 2;
            if (i + 2 < inputlen) {
                b |= (input[i + 2] & 0xC0) >> 6;
                out += (codes[b]);
                b = input[i + 2] & 0x3F;
                out += (codes[b]);
            } else {
                out += (codes[b]);
                out += ('=');
            }
        } else {
            out += (codes[b]);
            out += ("==");
        }
    }

    return out;
};

/**
 * 去除空格
 * **/
VKUtils.Trim = function (str) {
    var result;
    result = str.replace(/(^\s+)| (\s+$)|\s/g, "");
    return result;
};
/**
 * 实时动态强制更改用户录入
 * arg1 inputObject
 **/
VKUtils.Money = function (obj) {
    obj = obj.replace(/[^\d.]/g, "");
    obj = obj.replace(/^\./g, "");
    obj = obj.replace(/\.{2,}/g, ".");
    obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    if (obj.length > 2)
        obj = parseFloat(obj);
    return obj;
};

/**
 * 转换为double
 * arg1 inputObject
 **/
VKUtils.Double = function (value) {
    if (!value) return 0;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    if (value.length > 2)
        value = parseFloat(value);
    return value;
};
VKUtils.formatNumber = function(number, srcdecimals, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    let decimals = srcdecimals + 1;
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    let tmpRet = s.join(dec);
    return tmpRet.substr(0,tmpRet.length - 1);
}
/**
 * 清楚小数点和数字以外其他字符
 * arg1 inputObject
 **/
VKUtils.Numbers = function (value) {
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    return value;
};


VKUtils.checkPhone = function (value) {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
        return false;
    }
    return true;
};

VKUtils.checkEmail = function (value) {
    if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) {
        return false;
    }
    return true;
};

VKUtils.getAgeFromIdno = function (idCard) {
    var birthdayStr;
    if (15 == idCard.length) {
        birthdayStr = idCard.charAt(6) + idCard.charAt(7);
        if (parseInt(birthdayStr) < 10) {
            birthdayStr = '20' + birthdayStr;
        } else {
            birthdayStr = '19' + birthdayStr;
        }
        birthdayStr = birthdayStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11);
    }else if (18 == idCard.length) {
        birthdayStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13);
    }
    return birthdayStr;
};
VKUtils.changeDateFormat = function(str){
    var s = '';
    var hour = parseInt(str.substring(11,13));

    if (hour < 12){
        s  = "上午 " ;
    }else if (hour > 12){
        s  = "下午 " ;
    }

    return str;//s + str.substring(11,16);
};
/**
 * 根据生日获取年龄
 * @param strBirthday 2017-01-02格式
 * @returns {number}
 */
VKUtils.getAge = function(strBirthday){
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    if (strBirthdayArr.length < 3) return 0;
    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear)
    {
        returnAge = 0;//同年 则为0岁
    }
    else
    {
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0)
        {
            if(nowMonth == birthMonth)
            {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}

global.VKUtils = VKUtils;