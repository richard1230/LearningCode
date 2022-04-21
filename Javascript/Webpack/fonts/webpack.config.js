const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 占位符 placeholder
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 2048,
          },
        },
      },
      {
        test: /.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ],
      },
      {
        test: /.(eot|svg|ttf|woff)/,//一般下载好一个iconfont字体图标之后,会包含这几种格式的文件
        use: 'file-loader' //使用file-loader来打包这几种格式的图片
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
