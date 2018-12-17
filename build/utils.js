const glob = require('glob');// glob是webpack安装时依赖的一个第三方模块，该模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
let PAGE_PATH = path.resolve(__dirname, '../src/pages');


//多入口配置
//通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件。如果该文件存在，那么就作为入口处理
exports.entries = () => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/*.js');//page目录下所有的js入口文件
    let map = {};
    entryFiles.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    });
    return map
};

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugins = () => {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
    let arr = [];
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        let conf = {
            template: filePath,//模板来源
            filename: filename + '.html',//文件名
            inject: true,//true: 默认值,script标签位于html文件的body底部;body:script标签位于html文件的body底部;head: script标签位于html文件的head中;false: 不插入生成的js文件，这个几乎不会用到的
            chunks: ["manifest", "vendors", filename],// 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            minify: { // 压缩 HTML 的配置
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true
            }
        };
        arr.push(new HtmlWebpackPlugin(conf));
    });
    return arr
};
