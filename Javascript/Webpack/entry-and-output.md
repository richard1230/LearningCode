
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