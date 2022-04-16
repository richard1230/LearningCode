
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
默认入口: `src/index.js`;
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
