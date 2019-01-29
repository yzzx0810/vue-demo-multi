const webpack = require('webpack');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseWebpackConfig = require('./webpack.config.base');
//样式文件分别打包
const ExtractTextPluginCss = new ExtractTextPlugin('css/[name]/[name]-one.css');
const ExtractTextPluginScss = new ExtractTextPlugin('css/[name]/[name]-two.css');
const ExtractTextPluginLess = new ExtractTextPlugin('css/[name]/[name]-three.css');
const utils = require('./utils');

const env = require('../config/' + process.env.env_config + '.env.js');
console.log("==========>" + process.env.env_config);

const webpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "cheap-module-source-map",
    devServer: {
        clientLogLevel: "error",//日志级别，可能的值有 none, error, warning 或者 info（默认值）。
        contentBase: false,//告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        compress: true,//当它被设置为true的时候对所有的服务器资源采用gzip压缩
        historyApiFallback: false,//404页面是否跳转
        hot: true,//热替换加载
        host: "localhost",//域名
        port: 8080,//端口号
        open: false,//server启动后是否自动打开浏览器
        overlay: {//用来在编译出错的时候，在浏览器页面上显示错误
            warnings: false,
            errors: true
        },
        publicPath: "/",//此路径下的打包文件可在浏览器中访问
        quiet: true,//启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。意味着来自 webpack 的错误或警告在控制台不可见。
        watchOptions: {//监听文件变化，当它们修改后会重新编译。
            aggregateTimeout: 500,//当第一个文件更改，会在重新构建前增加延迟。以毫秒为单位
            poll: false,//是否开启轮询，如果开启则设置定时间隔时间
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),//实现页面自动刷新，与hot：true配对使用
        ExtractTextPluginCss,
        ExtractTextPluginScss,
        ExtractTextPluginLess
    ].concat(utils.htmlPlugins())
});

module.exports = webpackConfig;