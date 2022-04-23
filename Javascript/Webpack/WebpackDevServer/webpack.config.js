const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  devServer: {
    static: './dist',   //webpack-dev-server配置
    proxy: {
      '/users': {
        target: 'https://api.github.com/',
        changeOrigin: true
      }
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      cache: false
    }),
    new CleanWebpackPlugin(),
  ],
};

