
视频地址:
https://www.bilibili.com/video/BV1Z44y1K7Fj?p=100&vd_source=0aa76d6c0cefdf813dbf5b083daafb6a


笔记目录:

https://www.yuque.com/fechaichai/tzzlh1/obkdhx

项目地址

https://gitee.com/react-cp/react-pc-code

## 配置sass

```shell
yarn add sass -D

```


## 配置别名路径

CRA 将所有工程化配置，都隐藏在了 react-scripts 包中，所以项目中看不到任何配置信息(就是类似Webpack相关的文件)

如果要修改 CRA 的默认配置，有以下几种方案： 
 - 通过第三方库来修改，比如，@craco/craco  （推荐）
 - 通过执行 yarn eject 命令，释放 react-scripts 中的所有配置到项目中

实现步骤

1. 安装修改 CRA 配置的包：yarn add -D @craco/craco
2. 在项目根目录中创建 craco 的配置文件：craco.config.js，并在配置文件中配置路径别名
3. 修改 package.json 中的脚本命令
4. 在代码中，就可以通过 @ 来表示 src 目录的绝对路径
5. 重启项目，让配置生效


## @别名路径提示
   本节目标:  能够让vscode/webstorm识别@路径并给出路径提示
   实现步骤
1. 在项目根目录创建 jsconfig.json 配置文件
2. 在配置文件中添加以下配置

jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 登陆模块

https://www.yuque.com/fechaichai/tzzlh1/bivd9h


### 封装http工具模块

```shell
yarn add axios

```


### 配置登录Mobx
```shell
yarn add mobx mobx-react-lite
```

### 请求拦截器注入

一处配置token,多处生效


### 路由鉴权实现

思路为：判断本地是否有token，如果有，就返回子组件，否则就重定向到登录Login


![img.png](img.png)

![img_1.png](img_1.png)

![img_2.png](img_2.png)

![img_3.png](img_3.png)

token删除以后,再次刷新就重定向到登陆页面了
![img_4.png](img_4.png)

## Layout模块



### 401token实现

```shell
$yarn add history
```


### 125-echart基础使用

```shell
yarn add echarts

```

![img_6.png](img_6.png)

### p130获取文章列表

![img_5.png](img_5.png)


p132继续

后面每次提交之前搞的截图,说明每次完成了什么功能


## p137(要写效果图了)

p137效果图:

![img_7.png](img_7.png)

### 138-富文本编辑器

```shell
yarn add react-quill
```

![img_8.png](img_8.png)

改高度:

```scss
.publish {
  position: relative;
  // 加的是下面这行
  .ql-container{
    height: 400px !important;
  }
}
```

![img_9.png](img_9.png)

## p139重构频道获取


0.article和publish同时用到channel接口中数据(称为channel)

1.channel可以写在store里面,而后将其导出

2.article和publish又都被包含在Layout模块里面,可以通过导入store,使其在页面刚加载的时候渲染(通过useEffect)

3.分别在article和publish中导入store,在各自模块中使用map展开

![img_10.png](img_10.png)


## p140基础上传

![img_11.png](img_11.png)

p141:

主要看序号为1的,序号为0的是前面上传的第一个图片

![img_12.png](img_12.png)

## p142










































## 参考

文章管理模块: https://www.yuque.com/fechaichai/tzzlh1/rm4hzp#3dccd864



