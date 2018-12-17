export const Tools = {
    // 输入长度限制
    //propName: 标签id; len: 限制的长度
    limitInput: function (propName, len) {
        var prop = '#' + propName;
        var strVal = $(prop).val().trim();//去除两端空格的数字串
        //如果含有空格，保证以不含空格的数字串显示
        if ($(prop).val().length > strVal.length) {
            $(prop).val(strVal);
        }
        //如果去除空格的数字串长度大于限制的长度，只显示前len位
        if (strVal.length > len) {
            $(prop).val(strVal.substr(0, len));
            strVal = $(prop).val();
        }
        return strVal;
    },
    // 数据校验
    data: {
        check: {
            isNumber: function (str) {
                var reg = /^[0-9][0-9]*$/;
                return reg.test(str);
            },
            isEmpty: function (obj) {
                if (obj == null || obj == undefined || ("" + obj) == "" || (obj.length != undefined && obj.length == 0)) {
                    return true;
                }
                return false;
            },
            isFloat: function (str) {
                var reg = /^[0-9]*(\.[0-9]{1,2})?$/;
                return reg.test(str);
            },
            isSixLengthNum: function (str) {
                var reg = /^\d{6}$/;
                return reg.test(str);
            },
            isPhoneNum: function (str) {
                var reg = /^1[3-9]\d{9}$/;
                return reg.test(str);
            },
            isMbrCard: function (str) {
                var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]*$/;
                return reg.test(str);
            }
        }
    },

    getCookie: function (cookieName) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (cookieName == arr[0]) {
                return arr[1];
            }
        }
        return "";
    },
    setCookie: function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    delCookie: function (cookieName) {
        var exp = new Date();
        exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var cval = Tools.getCookie(cookieName);
        document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
    },
    //商户资质管理上传图片地址
    baseImgUploadUrl: "https://qr-test1.chinaums.com/umweb",//144
    //baseImgUploadUrl:"https://qr-test1.chinaums.com/umweb211",//211
    //baseImgUploadUrl:"/umweb",//BaiDuCloud

    //商户资质管理图片显示地址
    baseShowImgUrl: "https://qr-test1.chinaums.com/umweb/file/download/",//144
    // baseShowImgUrl:'https://qr-test1.chinaums.com/umweb211/file/download/',//211
    //baseShowImgUrl:"/umweb/file/download/",//baiducloud
};