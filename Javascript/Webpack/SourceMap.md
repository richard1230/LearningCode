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
```
Uncaught TypeError: console.logg is not a function
    at eval (index.js?b635:1:1)         //这是源代码出错的位置
    at Object../src/index.js (bundle.js:18:1)  //这是打包后的代码出错的位置
```
SourceMap配置的地方:
```javascript
  devtool: 'eval-source-map',//建立源代码和打包生成代码的对应关系;
```
更多配置参考:
https://webpack.js.org/configuration/devtool/

配置1:
```javascript
  devtool: 'source-map',//建立源代码和打包生成代码的对应关系;
```
dist文件下会有一个和输出文件同名的map文件生成;
```
生成文件为1.js, 有一个对应的map文件为1.js.map
```
配置2(常用的):
```javascript
  devtool: 'eval-cheap-source-map',//建立源代码和打包生成代码的对应关系;
```

eval-cheap-source-map - Similar to eval-source-map, each module is executed with eval().
It is "cheap" because it doesn't have column mappings, it only maps line numbers.
It ignores SourceMaps from Loaders and only display transpiled code similar to the eval devtool.


开发模式时:
```javascript
 mode: 'production',
  devtool: 'cheap-module-source-map',//建立源代码和打包生成代码的对应关系;
```





