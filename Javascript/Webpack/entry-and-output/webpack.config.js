const path = require('path');

//此插件作用:自动生成dist/index.html,
// 并且引入生成的js文件即:`dist下面的js文件`
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output:{
    publicPath: 'http://cdn.xxx.com/',
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}