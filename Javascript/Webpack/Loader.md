
## Loader
Webpack默认情况下只能给js进行打包;

后面加入了给其他文件打包的功能,就有了Loader;
Loader就是在webpack里面帮助开发者处理不同模块的;


比如想要给jpg这种图片打包，就要使用file-loader;
```shell
yarn add file-loader
#或者
npm install file-loader
```
而后:
```shell
npx webpack
```