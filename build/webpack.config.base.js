const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//样式文件分别打包
const ExtractTextPluginCss = new ExtractTextPlugin('css/[name]/[name]-one.css');
const ExtractTextPluginScss = new ExtractTextPlugin('css/[name]/[name]-two.css');
const ExtractTextPluginLess = new ExtractTextPlugin('css/[name]/[name]-three.css');
const utils = require('./utils');

module.exports = {
    entry: utils.entries(),
    output: {
        path: path.resolve(__dirname, "../dist"),//编译输出的文件目录绝对路径
        filename: "js/[name].js",//文件名
        publicPath: "./"//引入资源文件的前缀公共路径
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css', '.scss'],
        alias: {
            "vue": 'vue/dist/vue.js',
            "@": path.join(__dirname, "..", "src")
        }
    },
    module: {//loader加载执行顺序从右往左
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.css/,
                use: ExtractTextPluginCss.extract({
                    use: [
                        {
                            loader: "css-loader",
                            // options: {importLoaders: 1}//1代表css-loader后还需要几个loader
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUnit: 40//设计稿/10
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require("autoprefixer")("last 100 versions")]}
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPluginScss.extract({
                    use: [
                        {
                            loader: "css-loader",
                            // options: {importLoaders: 1}
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUnit: 40//设计稿/10
                            }
                        },
                        {
                            loader: "sass-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require("autoprefixer")("last 100 versions")]}
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPluginLess.extract({
                    use: [
                        {
                            loader: "css-loader",
                            // options: {importLoaders: 2}
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUnit: 40//设计稿/10
                            }
                        },
                        {
                            loader: "less-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require("autoprefixer")("last 100 versions")]}
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "image/[name].[ext]"
                }
            },
        ]
    }
};