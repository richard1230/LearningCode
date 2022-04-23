## 作用
WebpackDevServer作用:<br>
0.运行一个服务器并运行与8080端口;<br>
1.实现自动打包 ;(代替`npx  webpack`作用)<br>

## 安装

```shell
yarn add webpack-dev-server
```

## 配置
webpack.config.js:
```javascript
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  devServer: {
    static: './dist'   //webpack-dev-server配置,表示从哪个目录下面获取数据
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

```
package.json:
```json
"scripts": {
    "watch": "webpack --watch",
    "start": "webpack serve"
  },
```

## 运行
运行命令:
```shell
yarn run start
```

## WebpackDevServer实现请求转发

```shell
yarn add axios
```
更改配置:
```javascript
devServer: {
    static: './dist',   //webpack-dev-server配置
    proxy: {
      '/users': {
        target: 'https://api.github.com/',//如果有请求发送到/users这个路径,就转发到api.github.com
        changeOrigin: true
      }
    }
  },
```

源代码发生的变化:
```javascript
axios.get('/users/defunkt').then(({data}) => {
  console.log(data);
})
```
再重新启动一下:

```shell
yarn run start
```

### 怎样忽略以api为开头的接口中的api字符

```javascript
proxy: {
      '/api/users': {
        target: 'https://api.github.com/',//如果有请求发送到/users这个路径,就转发到api.github.com
        pathRewrite:{
          '^/api':''
    },
          changeOrigin: true
      }
    }

```

再重新启动一下即可;


源代码见:
https://github.com/richard1230/CodeLearning/tree/main/Javascript/Webpack/WebpackDevServer
