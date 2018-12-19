const Mock = require('mockjs');
const ApiPath = require('../api/apiPath');

Mock.mock(ApiPath.test.getInfo, "get", {
    "code": 0,
    "data": {
        "fullName": "@CNAME", //随机生成中文人名
        "userId": 1000234234001,
        "username": "zhangsan"
    },
    "msg": "success"
});

