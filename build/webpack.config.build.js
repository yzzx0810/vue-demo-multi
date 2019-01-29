const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseWebpackConfig = require('./webpack.config.base');
//样式文件分别打包
const ExtractTextPluginCss = new ExtractTextPlugin('css/[name]/[name]-one.[chunkhash].css');
const ExtractTextPluginScss = new ExtractTextPlugin('css/[name]/[name]-two.[chunkhash].css');
const ExtractTextPluginLess = new ExtractTextPlugin('css/[name]/[name]-three.[chunkhash].css');
const utils = require('./utils');

const env = require('../config/' + process.env.env_config + '.env.js');
console.log("==========>" + process.env.env_config);

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.ProvidePlugin({}),
        new VueLoaderPlugin(),//vue15.0版本以上需结合该插件
        // new BundleAnalyzer(),//图形化表示各个chunk有哪些模块组成
        new CleanWebpackPlugin(
                ["dist"],//匹配删除的文件
                {
                    root: path.join(__dirname, ".."),//删除文件前缀根目录
                    verbose: true,//开启在控制台输出信息,将log写到 console.
                    dry: false//启用删除文件（不要删除任何东西，主要用于测试），true表示不删除，false表示删除
                }
        ),
        ExtractTextPluginCss,
        ExtractTextPluginScss,
        ExtractTextPluginLess,
    ].concat(utils.htmlPlugins()),
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',//表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)(default=all);
            name: true,//拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
            minChunks: 1,//在分割之前模块的被引用次数(default=1)
            minSize: 30000,//代码块的最小尺寸(default=30000)
            maxAsyncRequests: 5,//按需加载最大并行请求数量(default=5)
            maxInitialRequests: 3,//一个入口的最大并行请求数量(default=3)
            automaticNameDelimiter: '~',
            cacheGroups: {//可以继承/覆盖上面 splitChunks 中所有的参数值
                vendors: {
                    name: "vendors",
                    chunks: "all",
                    test: /node_modules\//,//表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
                    priority: 10,//表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
                    reuseExistingChunk: true//表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                },
            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    }
});

module.exports = webpackConfig;