
## 前言
![img.png](img.png)


![img_1.png](img_1.png)

3为答案

在 x.ts  =====> 当前文件可用

在 yyy.d.ts,=======>整个项目可用(就是src)


## 例子1


![img_2.png](img_2.png)

![img_3.png](img_3.png)

vscode下载了这个库;

![img_4.png](img_4.png)

![img_5.png](img_5.png)

这个配置文件告诉vs去用这个dom库

## 例子2

![img_7.png](img_7.png)

根据报错去google

![img_6.png](img_6.png)

![img_8.png](img_8.png)

![img_9.png](img_9.png)

## 例子3

![img_10.png](img_10.png)

![img_11.png](img_11.png)


## 小结

![img_12.png](img_12.png)

react.d.ts ------> 类型声明(C语言中 ` *.h ` 为声明)

react.js  -------->具体实现(C语言中 `*.c` 为实现)


![img_13.png](img_13.png)



![img_14.png](img_14.png)


## 独立模块

![img_15.png](img_15.png)

![img_16.png](img_16.png)


![img_17.png](img_17.png)

1. 所有ts文件都必须为模块,包括`index.ts`
2. 所有ts文件必须不得写 declare, const, enum

## declare

![img_18.png](img_18.png)


![img_19.png](img_19.png)

![img_21.png](img_21.png)

![img_20.png](img_20.png)

![img_22.png](img_22.png)

推荐新语法

![img_23.png](img_23.png)

### 发散思考

![img_24.png](img_24.png)

对于第2点,名字要一样!!!(目录也要在同一个路径下)


## CommJS_全局问题

![img_25.png](img_25.png)


![img_26.png](img_26.png)


![img_27.png](img_27.png)




![img_29.png](img_29.png)
上图中的问题是由于:

vite没有做这个事: node.js中的require转换成为浏览器中的require

![img_28.png](img_28.png)


再次回顾一下:

![img_31.png](img_31.png)

![img_30.png](img_30.png)

![img_32.png](img_32.png)


![img_33.png](img_33.png)



![img_34.png](img_34.png)
![img_35.png](img_35.png)

解决方案:

![img_36.png](img_36.png)




在注意一下:

![img_38.png](img_38.png)

当前是模块的话，就不用全局变量了(declare就不能是全局变量);

不是模块,declare就是全局变量;

### 全局变量+ES6

![img_37.png](img_37.png)

![img_39.png](img_39.png)
![img_40.png](img_40.png)
![img_42.png](img_42.png)

![img_41.png](img_41.png)


## 总结

![img_43.png](img_43.png)

![img_44.png](img_44.png)


![img_45.png](img_45.png)

![img_46.png](img_46.png)


此时的declare就是全局变量,没有export/import;

![img_47.png](img_47.png)


## namespace

![img_48.png](img_48.png)


一般不要用`declare var/let/var`

最好这样写:

![img_50.png](img_50.png)

![img_49.png](img_49.png)

![img_52.png](img_52.png)

![img_51.png](img_51.png)



![img_53.png](img_53.png)



## 最后的总结

![img_54.png](img_54.png)

非模块是早期的妥协;

只要是有import/export ----->认为是模块,此时declare声明的不是全局变量

`export ={} `是旧的commJs语法,一般不推荐

`export {} ` 是精华


## 参考

![img_55.png](img_55.png)


https://ts.xcatliu.com/basics/declaration-files.html















