import axios from 'axios';

// 通用配置 --> 指定的配置将与该实例的通用配置合并
let http = axios.create({

    // baseURL: process.env.NODE_ENV === 'production' ? 'https://um.chinaums.com:10080/umweb' :'/api' ,//需要改成后端ip：port
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://qr-test1.chinaums.com' :'/api' ,//需要改成后端ip：port
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://qr-test1.chinaums.com/umweb211' :'/api' ,//需要改成后端ip：port
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        // console.log("发送数据前可以修改啦。。。");
        return data
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data
    }]
});

const apiAxios = (method, url, request, successCallback, errorCallback) => {
    // request.CSRFToken = Tools.getCookie("CSRFToken");
    let req = JSON.stringify(request);
    http({
        method: method,
        url: url,
        data: method === 'POST' ? req : null,
        params: method === 'GET' ? req : null,
        headers: {
            'CSRFToken': Tools.getCookie("CSRFToken")
        }
    }).then(function (res) {
        if (res.status === 200) {
            //解决CSRF问题
            // let newToken = res.headers.csrftoken;
            // if (newToken != null && newToken != "") {
            //     Tools.delCookie("CSRFToken");
            //     Tools.setCookie("CSRFToken", newToken);
            // }
            let data = JSON.parse(res.data);
            successCallback ? successCallback(data) : () => {
                alert("缺少调用成功Callback函数");
            };
        } else {
            errorCallback ? errorCallback() : () => {
                alert("缺少调用失败Callback函数");
            };
        }
    }).catch(function (err) {
        console.log("api error\n");
        console.log(err);
    })
}

const get = (url, params, successCallback, errorCallback) => {
    return apiAxios('GET', url, params, successCallback, errorCallback);
};

const post = (url, params, successCallback, errorCallback) => {
    return apiAxios('POST', url, params, successCallback, errorCallback);
};

export default {get, post};
