## 常用的函数

```html

<div id="box">123123</div>
<div>123123</div>
<div>12222</div>
<div class="box">123123</div>
<div class="box">223344</div>

<input type="text" name="username"/>
<div class="text">123</div>
<div class="text"> 12355</div>
<div>
  <h1>
    <p>
      123
    </p>
  </h1>
</div>
<div>
  <p>234</p>
</div>

<div class="box">123</div>
<div class="box">234</div>
<div class="box">345</div>

<ul>
  <li>
    <h2> 我是标题标签 </h2>
    <a href="">我是超链接</a>
    <p>我是段落标签</p>
  </li>
</ul>

<ul>
  <li>
    <!--<h2> 我是标题标签 </h2>   注释-->
    <a href="">我是超链接</a>
    <p>我是段落标签</p>
    <h1>标题标签</h1>
  </li>
</ul>
```

```javascript
var box = document.getElementById("box")//一般不用id,只有这一个是单个的,其他都是一组一组的
var boxes = document.getElementsByTagName("div")//类数组--->重要,这不是数组
var box = document.getElementsByTagName("div")[0]
var boxes = document.getElementsByClassName("box")
var boxes0 = document.getElementsByClassName("box")[0]
boxes0.style.color = "red"
var input1 = document.getElementsByName('username')//用的少

//querySelector() querySelectorAll  ---> 早就存在了
//HTML5 新引入的
//性能不行
//不实时
//公司里面要少用

var div1 = document.querySelector('div')//默认选第一个
var p1 = document.querySelector('div > p')
var p2 = document.querySelector('div  p')

var divs = document.querySelectorAll("div")//和下面效果一样,但是效果比不上前面的getElementsByName等函数
var divs1 = document.querySelectorAll(".box")//和上面效果一样
console.log(divs)
divs[0].remove();
console.log(divs)//会发现divs没有发生变化,--->不实时

//遍历节点树 - 元素节点树
//节点包含元素
//节点包含元素--> 元素节点 = DOM元素
//parentNode
//childNode  --->易错点
//1.元素节点
//2.属性节点
//3.文本节点
//4.注释节点
//5.document
//6.DocumentFragment
// var a = document.getElementsByTagName('a')[0]

var li = document.getElementsByTagName('li')[0];
console.log(li.childNodes.length)//9
//nextSibling，previousSibling,firstChild,lastChild，parentNode，childNode--->用于遍历节点树


//遍历元素节点树
//parentElement
//children
//childElementCount = children.legth
//firstElementChild,lastElementChild
//previousElementSibling,nextElementSibling

```

## ChildNode

```html

<ul>
  <li>
    <!--<h2> 我是标题标签 </h2>   注释-->
    <a href="">我是超链接</a>
    <p>我是段落标签</p>
    <h1>标题标签</h1>
  </li>
</ul>
```

```javascript
var li = document.getElementsByTagName('li')[0];
console.log(li.childNodes.length)//9
```

![子节点数量](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj6fmuvjNmMZcBAcbtgA0oic6HzLoNfoGMCEib3NnPEGlrI5QDZxPuRgQcLmziaIicUeDs2tHNst97ZsQA/0?wx_fmt=png)

## DOM结构树

![结构树](http://liangxinghua.com/uploads/image/20190319/1552977664.png)

```javascript
  function Document() {

}

Document.prototype = {
  getElementById: function () {
  },
  ...
}

var document = new Document();//其实document 构造函数 -> HTMLDocument

```

document 构造函数 -> HTMLDocument HTMLDocument 构造函数 -> Document HTMLDocument 构造出来的对象里面有 __proto__ .Document.prototype

document.__proto__ = HTMLDocument.prototype HTMLDocument.__proto__ = Document.prototype

最终： document 》HTMLDocument 》Document 》Node

```javascript
 HTMLDocument.prototype.say = function () {
  console.log("我在说话")
}

Document.prototype.eat = function () {
  console.log("我在吃")
}

document.say();//我在说话
document.eat()//我在吃
document.getElementsByClassName()//以get开头的这些函数都是继承Document的
//写框架，库，插件，工具,模块化编程基本都需要 在原型上编程
```

再看一个例子:

```html

<div>123</div>
<p>234</p>
```

```javascript
Text.prototype.aaa = 'aaa';
CharacterData.prototype.bbb = 'bbb';
var div = document.getElementsByTagName('div')[0];
var text = div.childNodes[0];
console.log(text.aaa)///aaa
console.log(text.bbb)//bbb
```

HtmlElement所构造出来的所有对象都继承Element.prototype里面的方法和属性!<br>

```javascript
  Element.prototype.aaa = 'aaa';
HTMLElement.prototype.bbb = 'bbb';
HTMLDivElement.prototype.ccc = 'ccc';
var div = document.getElementsByTagName('div')[0];
typeof document.getElementsByTagName('div')[0]//object类型
document.getElementsByTagName('div')[0].constructor === HTMLDivElement//true
//就是说div的构造就是HTMLDivElement

var p = document.getElementsByTagName('p')[0];//而p的构造是HTMLParagraphElement

console.log(div.aaa)//aaa
console.log(div.bbb)//bbb
console.log(div.ccc)//ccc

console.log(p.aaa);//aaa
console.log("p.bbb: " + p.bbb)//bbb
console.log(p.ccc)//没有任何结果，因为HTMLDivElement与HTMLParagraphElement是同一级的
//HTMLDivElement与HTMLParagraphElement的父级为HTMLElement

//判断对象类型,这里可以判断是什么类型的标签
Object.prototype.toString.call(div)
//"[object HTMLDivElement]"
```

## DOM操作深入

1.getElementById,getElementsByName只有Document.prototype才有!!!!!!<br>
2.getElementsByTagName ,getElementsByClassName ,querySelector(),querySelectorAll()
这四个函数在Document.prototype和 Element.prototype里面都有！！！！！！
```html
<div>
  <p class="text" name="p">111</p>
  <input type="text" name="username">
</div>
```
```javascript
//getElementById,getElementsByName只有Document.prototype才有!!!!!!
// var div = document.getElementsByName('div')[0];
// div.getElementById()//会报错


document.__proto__ //---》HTMLDocument
//HTMLDocument，这说明document是HTMLDocument实例化之后构造出来的
//一切的原型链是以原型来连接的

// Document.prototype.querySelectorAll()
//getElementsByTagName
//getElementsByClassName
//querySelector(),querySelectorAll()
//上面这四个函数在Document.prototype和  Element.prototype里面都有！！！！！！

//*  --->获取标签用的,只能配getElementsByTagName
var all = document.getElementsByTagName('*')
console.log(all)

var body = document.body;//这里的body是通过document.body来使用的，这个属性是系统内置的,只能使用，不能访问
//HTMLDocument.prototype.body  //会报错
var head = document.head;

```
## DOM节点操作



