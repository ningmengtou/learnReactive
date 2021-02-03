const path = require('path');

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 出口文件
  output: {
    // publicPath 指虚拟打包文件路径 不会真正打包
    publicPath: 'xuni',
    // 打包的文件名
    filename: 'bundle.js'
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件夹
    contentBase: 'public'
  }
};