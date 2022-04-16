
## 入口和出口

```bash
$pwd
/Users/....../CodeLearning/Javascript/Webpack/entry-and-output
## 安装webpack
$yarn add webpack webpack-cli --dev
##安装特定版本
$yarn add webpack@4.29.6 webpack-cli@3.2.3 --dev

## 打包
$npx webpack
```
打包完成之后,会多出一个`dist/main.js`文件,此文件是被压缩的;
如果想要使用`dist/main.js`文件,创建一个文件`dist/index.html`
添加如下至`dist/index.html`:
```html
<div id="app"></div>
<script src="./main.js"></script>
```
运行`dist/index.html`

## 小结1
默认入口: `src/index.js`;<br>

出口:`dist/main.js`

## 自己配置

在根目录下面创建一个配置文件`projectname/webpack.config.js`
这里的根目录为:
`/Users/....../CodeLearning/Javascript/Webpack/entry-and-output`

```javascript
const path = require('path');

module.exports = {
  //入口与出口
  entry: './src/index.js',
  output:{
    //路径
    path: path.resolve(__dirname,'dist'),
    //路径下的文件
    filename: 'main.js'
  }
}
```

## 将不同的文件打包到各自的文件中

```javascript
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  }
}
```
此时dist下面生成两个文件了;
```shell
$tree ./dist
./dist
├── index.html
├── main.js
└── sub.js
```

## 添加能够自动生成dist下面html的插件
`src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<div id="app"></div>
</body>
</html>
```
此时webpack.config.js:
```javascript
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
    publicPath: 'http://cdn.xxx.com/',//添加这一行之后,dist下生成的index.html里面的src就会补全url
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}




```

此时的dist下的index.html就会发生变化:
```html
<script defer="defer" src="sub.js"></script>

```
会变为:
```html
<script defer="defer" src="http://cdn.xxx.com/sub.js"></script>
```



