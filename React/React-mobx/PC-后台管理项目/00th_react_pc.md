
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


![img_13.png](img_13.png)


![img_14.png](img_14.png)

切换到无图的时候需要没有上传的那个界面!

![img_15.png](img_15.png)


## p143 允许上传图片的数量

是否支持多传:
```jsx
 <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount>1}//表示大于1 的时候支持上传多张图片
                maxCount={imgCount}//表示最多上传几张图片

              >
```


## p144 收集表单数据提交接口

```jsx
const onFinish = (data)=>{
    console.log(data);//先看一下这个数据是啥

  }
```

![img_16.png](img_16.png)

![img_17.png](img_17.png)

需要做二次处理:  原来的要求为: https://www.yuque.com/fechaichai/tzzlh1/oh9sx3#1eb071f3
```
{
   channel_id: 1
   content: "<p>测试</p>"
   cover: {
      type: 1, 
      images: ["http://geek.itheima.net/uploads/1647066600515.png"]
   },
   type: 1
   title: "测试文章"
}
```

![img_18.png](img_18.png)


## 145-暂存图片列表


一个问题:

![img_19.png](img_19.png)

由三图切换至单图的时候发现图片始终为三张,没有变:

![img_20.png](img_20.png)


## p146

找到文章id,切换编辑与发布文章

```jsx
const [params] = useSearchParams()
  const id = params.get('id')
  console.log('route ',id);

{id?'编辑':'发布'}文章
```


## 147

通过文章id获取文章详情，进行回显操作:

![img_21.png](img_21.png)


## 148-149

![img_22.png](img_22.png)


![img_23.png](img_23.png)


## 150

```jsx
cover: {
        type: type,
        image: fileList.map(item => item.response.data.url)//这里是有问题的
      }
```
之前:

![img_25.png](img_25.png)


现在:

![img_24.png](img_24.png)

有bug的流程:

![img_26.png](img_26.png)


![img_27.png](img_27.png)

上图中期待的效果 应该为 红线部分:


## p152

使用步骤
1. 全局安装本地服务包 `yarn global add serve`
   该包提供了serve命令，用来启动本地服务
2. 在项目根目录中执行命令 serve -s ./build  在build目录中开启服务器
3. 在浏览器中访问：http://localhost:3000/ 预览项目

## P153分析包的大小体积

使用步骤
1. 安装分析打包体积的包：yarn add source-map-explorer
2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
```
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",//分析的是当前目录下的所有js文件
}
```
3. 对项目打包：yarn build（如果已经打过包，可省略这一步）
4. 运行分析命令：yarn analyze
5. 通过浏览器打开的页面，分析图表中的包体积

将经常不太变动但是体积又太大的包放到cdn服务器上面,借助浏览器缓存,让它加载以后每次再次打开,直接用缓存里面的数据

## p154 cdn配置

分析说明：通过 craco 来修改 webpack 配置，从而实现 CDN 优化

craco作用:不破坏当前结构自定义webpack

```js
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {//commonjs规范导出一个模块
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 现在是公共为了测试
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }

      return webpackConfig
    }
  }
}
```


最终版:

```js
const path = require('path')
const {whenProd, getPlugin, pluginByName} = require('@craco/craco')


module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      // @ 代表根目录，拼接的是 src 目录
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 现在是公共为了测试
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const {isFound, match} = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }
      return webpackConfig
    }
  }
}


```
重新 yarn build

serve -s ./build








































## 参考

文章管理模块: https://www.yuque.com/fechaichai/tzzlh1/rm4hzp#3dccd864



