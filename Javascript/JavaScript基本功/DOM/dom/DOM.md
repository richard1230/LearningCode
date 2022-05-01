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

创建:

```javascript
//创建
var div = document.createElement('div');
div.innerHTML = 123;
document.body.appendChild(div);

var text = document.createTextNode('Hello world')
document.body.appendChild(text)

```

增加子节点:

```html
<a href="">我是超链接</a>

```

```javascript
 var a = document.getElementsByTagName('a')[0];
var div = document.createElement('div');
div.innerHTML = '<p>我是段落标志</p>'
document.body.appendChild(div);//增加子节点--->总是在父级元素的最下边增加节点
```

![增加子节点](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj5hCEZaaqP63CmMQNQ4PCus5K3QWqhoLSTV4gUfDvKtThMD4oKYjLPxiae5ProLLSeJR4pLPVLjWYA/0?wx_fmt=png)

减少节点:

```javascript
 var a = document.getElementsByTagName('a')[0];
var div = document.createElement('div');
div.innerHTML = '<p>我是段落标志</p>'
document.body.appendChild(div);
div.appendChild(a);//除了增加，还有剪切节点的功能,这里就是体现
//a标签从上面移到了下面
```

![减少节点](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj5hCEZaaqP63CmMQNQ4PCusP8eRUy6lV7KwNAiaRBE0tmxyPvuJlDFfMIwR2dpfjgOsVMxedTTkeQw/0?wx_fmt=png)

### 插入节点

插入前：

```javascript
<div>
  <p>我是段落标签</p>
</div>
```

插入操作:

```javascript
//插入: 在父级c节点下的子节点b之前插入a节点
var div = document.getElementsByTagName('div')[0];
var p = document.getElementsByTagName('p')[0];
var a = document.createElement('a');
a.href = 'www.baidu.com';
//插入: 在父级div节点下的子节点p之前插入a节点
div.insertBefore(a, p)
```

插入后:

```javascript
<div>
  <a href="www.baidu.com"></a>
  <p>我是段落标签</p>
</div>
```

## 删除

```html

<div>
  <h1>我是标题</h1>
  <p>我是段落标签</p>
</div>
```

```javascript
 // //removeChild(子节点)--->删除子节点
// var div = document.createElement('div');
// document.body.appendChild(div);
// body.removeChild(div)//这一步其实只是将上一步的div从文档中抽离了(就是说你在视图中看不了了)
// //但是其实还是在内存里面的!!!

//节点:
//元素  文本  注释  属性  document  documentFragment

//  <p>我是段落标签</p>  //--->这是一个元素
//元素--->元素节点具有下面的若干属性:
//nodeName nodeValue nodeType attributes  hasChildNOdes
//元素  -> 构造函数实例化             -->    div节点
//div       new HTMLDivElement()            removeChild(div)
//          div对象存到了内存当中             只是删除了节点


//那么真正能够销毁的操作又是什么
var div = document.getElementsByTagName('div')[0];
var p = document.getElementsByTagName('p')[0];
p.remove()


```

### setAttribute

```html

<style>
  .running {
    color: green;
  }

  .warning {
    color: yellow;
  }

  .danger {
    color: red;
  }
</style>

<div class="running ">
  系统正常运行中...
</div>
```

```javascript
  var div = document.getElementsByTagName('div')[0]

function setSystemStatus(status) {
  div.setAttribute('class', status);
  switch (status) {
    case 'running':
      div.innerHTML = '系统正常运行中';
      break;
    case 'warning':
      div.innerHTML = '系统有警告';
      break;
    case 'danger':
      div.innerHTML = '系统存在危险';
      break;
    default:
      div.innerHTML = '系统处于为知状态';

  }

}
```

## data- 属性

```html
<p data-name="linus" data-age="18">
  My name is Linus
</p>
<script type="text/javascript">
  //HTML5给元素增加了一个 data- * 属性
  var p = document.getElementsByTagName('p')[0];
  // p.dataset
  // DOMStringMap {name: 'linus', age: '18'}
  // age: "18"
  // name: "linus"
  // p.dataset.name
  // 'linus'
  // p.dataset.age
  // '18'
  // p.getAttribute('data-name')
  // 'linus'
  // p.getAttribute('data-age')
  // '18'
</script>
```

### 创建文档碎片

文档碎片:<br>
是一个节点,但是它不存在于dom节点树里面,但是又可以接受li,最后又可以交给Ul; 它就是一个容器，可以保存li,最后保存好之后这些片段又可以交给ul(DOM结构);
在写列表的时候,都要先使用DocumentFragment保存列表的dom结构,保存完之后再交给外层容器!!!

```html

<ul id="list"></ul>
```

```javascript
// document.createDocumentFragment()
//创建文档碎片
//o开头的表示文档对象
var oUI = document.getElementById('list');

// for (let i = 0; i < 10000; i++) {
//   var oLi = document.createElement('li');
//   oLi.innerHTML = i+ ': 这是第' +  i + '个项目';
//   oLi.className = 'list-item';
//   oUI.appendChild(oLi)
// }
//上面这部分代码有个问题,每次 创建Li的时候都要回流一次(就是要测算某些元素直接的距离和几何关系,然后渲染)
//每调用一次appendChild就要计算一下几何数据
//下面看解决方法：
// var oDiv = document.createElement('div');
// for (let i = 0; i < 1000; i++) {
//   var oLi = document.createElement('li');
//   oLi.innerHTML = i + ': 这是第' + i + '个项目';
//   oLi.className = 'list-item';
//   // oUI.appendChild(oLi)
//   oDiv.appendChild(oLi)//注意:这里的oDiv不在节点树里面!!!
// }
// oUI.appendChild(oDiv)

//但是上面的代码仍然还有一个不足:
//多了个div节点,因为li就是要在ul里面，不需要div
//终极解决方案:
// createDocumentFragment()
var oFrag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  var oLi = document.createElement('li');
  oLi.innerHTML = i + ': 这是第' + i + '个项目';
  oLi.className = 'list-item';
  // oUI.appendChild(oLi)
  oFrag.appendChild(oLi)//注意:这里的oFrag不在DOM节点树里面!!!
}
oUI.appendChild(oFrag);

```
![oFrag](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj5VS8icRuoHicPoSrwLEKtLNicALUngkudtuPrLF695k3cRtZ2DkuTmmy9Jnbia2kKtYwDibRyLoQzkKLw/0?wx_fmt=png)


## 总结

1.只有`getElementById`是Element单数,其余为复数;
- 1.getElementById,getElementsByName只有Document.prototype才有!!!!!!<br>
- 2.`getElementsByTagName ,getElementsByClassName ,querySelector(),querySelectorAll()`,这四个函数在`Document.prototype`和` Element.prototype`里面都有！！！！！！

2.`querySelector() querySelectorAll`一般不用；

3.`nextSibling`与`nextElementSibling`区别:<br>
nextSibling属性返回元素节点之后的兄弟节点（包括文本节点、注释节点即回车、换行、空格、文本等等）;<br>
nextElementSibling属性只返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点）;<br>


4.节点类型:
- 1.元素节点  -> 1
- 2.属性节点   --> 2
- 3.文本节点    -> 3
- 4.注释节点   -> 8
- 5.document -> 9
- 6.DocumentFragment  -> 11

```javascript
 div.nodeType
  // 1
  div.getAttributeNode('class').nodeType
  //2
  div.getAttributeNode('id')
  // box
  div.getAttributeNode('id').nodeType//2
  div.firstChild.nodeValue = "hello"
  div.firstChild.nodeType
  // 3
```

5.判断对象类型,这里可以判断是什么类型的标签
```javascript
Object.prototype.toString.call(div)
//"[object HTMLDivElement]"
```


6. `*  --->获取标签用的,只能配getElementsByTagName,  获取所有元素节点`
```javascript
  var all = document.getElementsByTagName('*')
    console.log(all)

var body = document.body;//这里的body是通过document.body来使用的，这个属性是系统内置的,只能使用，不能访问
//HTMLDocument.prototype.body  //会报错
var head = document.head;
```

7.添加自定义属性:
```html
<a href="javascript:;"  data-uri="txwz" data-sort="free">天下无贼</a><br/>
<a href="javascript:;"  data-uri="fczlm" data-sort="pay">复仇者联盟</a><br/>
<a href="javascript:;"  data-uri="hgf" data-sort="free">黑寡妇</a><br/>
<a href="javascript:;"  data-uri="gtx" data-sort="pay">钢铁侠</a><br/>
```
```javascript
//HTML5给元素增加了一个 data- * 属性
var p = document.getElementsByTagName('p')[0];
  p.dataset
  // DOMStringMap {name: 'linus', age: '18'}
  // age: "18"
  // name: "linus"
  p.dataset.name
  // 'linus'
  p.dataset.age
  // '18'
  p.getAttribute('data-name')
  // 'linus'
  p.getAttribute('data-age')
  // '18'
```

8.与`ul`和`li`相关的文档碎片操作(可以提高性能)
```html
<ul id="list"></ul>
```
```javascript
var oUI = document.getElementById('list');

  var oFrag = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    var oLi = document.createElement('li');
    oLi.innerHTML = i + ': 这是第' + i + '个项目';
    oLi.className = 'list-item';
    // oUI.appendChild(oLi)
    oFrag.appendChild(oLi)//注意:这里的oFrag不在DOM节点树里面!!!
  }
 oUI.appendChild(oFrag);
```


  




