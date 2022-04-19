## Loader

Webpack默认情况下只能给js进行打包;

后面加入了给其他文件打包的功能,就有了Loader; Loader就是在webpack里面帮助开发者处理不同模块的;

比如想要给jpg这种图片打包，就要使用file-loader;


```shell
## 安装webpack
$yarn add webpack webpack-cli --dev
#安装插件
yarn add file-loader
#或者
npm install file-loader
```

而后:

```shell
npx webpack
```

## 插件(plugins)

源代码见[这里](https://github.com/richard1230/CodeLearning/tree/main/Javascript/Webpack/entry-and-output) <br>
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

安装插件:

```shell
yarn add html-webpack-plugin
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
  output: {
    publicPath: 'http://cdn.xxx.com/',//添加这一行之后,dist下生成的index.html里面的src就会补全url
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({  //这里的作用是帮你在`dist/index.html`里面添加`/src/index.html`里面的一行
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

有了模板template之后:
dist下的index.html就会增加一行:

```html

<div id="app"></div>
```

往往在重新打包的时候需要手动删除dist文件,往往使用`clear-webpack-plugin`
这个插件来实现自动删除; 安装插件:

```shell
yarn add clean-webpack-plugin
#或者 
npm install clear-webpack-plugin -D
```

同时`webpack.config.js`中:

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new CleanWebpackPlugin()
]
```

### file-loader

```javascript
module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,//表示能够处理后缀为jpg,png,gif结尾的图片
        use: {
          loader: 'file-loader',
          options: {
            // 占位符 placeholder,表示生成的图片的路径
            //为dist/images/
            //名字为 `src/`中jpg的图片的名字这里为avatar
            //avatar_hash值.后缀
            name: '[name]_[hash].[ext]',
            outputPath: 'images/'
          }
        }
      }
    ]
  }
```
配置文件见:
https://github.com/richard1230/CodeLearning/blob/main/Javascript/Webpack/Loader/webpack.config.js


## url-loader

```shell
yarn add url-loader
```
使用url-loader会帮我们把图片变成base64的字符串;
优点:
dist---> 少了 `.jpg` 图片文件 --->  减少一次图片的HTTP 请求;

页面加载: js加载完毕;
图片进入到 bundel.js中(通过base64形式);
图片过大 ---> bundle.js过大 ---> 页面加载完毕时间很长  --->  空白页面

图片只有1，2kb --->  bundle.js(base64)

图片很大---> file-loader ---> 生成单独的`.jpg`
去发送额外的HTTP请求,js抽次加载时间就很短，页面很快就会出来


## style-loader和css-loader
```javascript
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
            limit: 2048
          }
        }
      },
      {
        test: /.css$/,
        use: [
          'style-loader',//将css-loader生成的css代码放入html的head标签里面
          'css-loader'  //帮助分析css文件之间的引用关系并生成css代码
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```

