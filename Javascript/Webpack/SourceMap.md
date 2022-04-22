## 作用
建立源代码和打包生成代码的对应关系;
```javascript
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',//建立源代码和打包生成代码的对应关系;
  entry: {
    main: './src/index.js',
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
    }),
    new CleanWebpackPlugin(),
  ],
};

```

报错:
```javascript
Uncaught TypeError: console.logg is not a function
    at eval (index.js?b635:1:1)         //这是源代码出错的位置
    at Object../src/index.js (bundle.js:18:1)  //这是打包后的代码出错的位置
```

