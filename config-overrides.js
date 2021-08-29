
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const {
    addWebpackPlugin,
    override,
    fixBabelImports,
    addWebpackAlias,
    addLessLoader,
    addBabelPlugins // babel插件配置函数
} = require('customize-cra');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#1DA57A" }
    }),
    addWebpackAlias({
        ['@']: resolve('src'),
        ['src']: resolve('src'),
    }),
    addBabelPlugins( // 支持装饰器
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ]
    ),
    addWebpackPlugin(new CompressionPlugin({
        filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        algorithm: 'gzip', // 算法
        test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
        threshold: 10240, // 只处理比这个值大的资源。按字节计算
        minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    })),
);
