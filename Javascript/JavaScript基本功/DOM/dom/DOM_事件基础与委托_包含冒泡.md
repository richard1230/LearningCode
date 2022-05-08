## 绑定事件

- 元素天生具有事件
- JS绑定事件的实质是绑定事件的处理函数（反馈）
- 事件 + 事件的反馈 = 前端交互、交互体验（前端的核心）

（1）绑定事件处理程序 = 事件处理函数

```javascript
onclick = funcion()
// {//事件反馈}
```

（2）事件源、句柄、事件句柄

```javascript
oBtn.onclick = function () {
  // 处理逻辑
}

// 事件源：oBtn
// 句柄：oBtn.onclick
// 事件句柄：oBtn.onclick = function() {...}
```

2、绑定事件处理函数的方法

```javascript
<button>点击</button>
var oBtn = document.getElementsByTagName('button')[0];

// 1、elem.onclick = function(){}
// 同一个元素只能绑定一个onclick事件，多个会覆盖
oBtn.onclick = function () {
  this

  //this指的是 oBtn;
}

// 2、elem.addEventListener(事件类型, 事件处理函数, false); - IE9以下不支持，W3C规范
// 同一个元素可以绑定多个事件处理函数
oBtn.addEventListener('click', function () {
  this

  //this指代 oBtn;
}, false);

oBtn.addEventListener('click', function () {
  this
  //this指代 oBtn;
}, false);

// 以下示例为同一个事件处理函数
oBtn.addEventListener('click', test, false);
oBtn.addEventListener('click', test, false);

// 只会输出1次1，因为 test 为同一个事件处理函数

function test() {
  console.log(1);
}

// 3、elem.attachEvent(事件类型, 事件处理函数)
// IE8及以下的绑定方法
// 绑定几次就打印几次
oBtn.attachEvent('onclick', function () {
  this

  //this指代 window
  // 只能用 oBtn

  // 解决如下: call 改变this指向
  test.call(oBtn);
});

// 示例
oBtn.attachEvent('onclick', test);
oBtn.attachEvent('onclick', test);

// 输出2次1

function test() {
  console.log(this);
}
```

### 绑定事件封装(重要)

```javascript
// 事件封装
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    // W3C
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    // IE8及以下
    el.attachEvent('on' + type, function () {
      fn.call(el);
    });
  } else {
    // 最低版本
    el['on' + type] = fn;
  }
}

// 使用
addEvent(oBtn, 'click', function () {
  console.log(1);
});
```

解除事件绑定

```javascript
element.onclick = null / false;
element.removeEventListener('click', test, false);
element.detachEvent('onclick', test);

// 封装
function removeEvent(el, type, fn) {
  if (el.addEventListener) {
    el.removeEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.detachEvent('on' + type, fn);
  } else {
    el['on' + type] = null;
  }
}
```

## 冒泡与捕获

1）事件冒泡

- addEventListener 第三个参数为false
- 点击子元素，由子元素一层一层的传递给父元素，事件源先执行，然后在一层一层执行
- `p -> div -> body -> html -> document`

2）事件捕获

- addEventListener 第三个参数为true
- 点击子元素，由父级元素一层一层的传递给子元素，事件先不执行，找到顶层父级往下一层一层执行，最后执行事件源
- `document -> html -> body -> div -> p`

3）顺序

- 如果事件源同时绑定多个事件：先捕获，后冒泡
- 事件源不存在冒泡与捕获，按照绑定顺序执行

4）无冒泡与捕获

- focus、blur、change、submit、reset、select 无冒泡捕获
- IE 无捕获

```html

<style>
  .wrapper {
    width: 300px;
    height: 300px;
    background-color: #00FF00;
  }

  .wrapper .outer {
    width: 200px;
    height: 200px;
    margin-left: 300px;
    background-color: red;
  }

  .wrapper .outer .inner {
    width: 100px;
    height: 100px;
    margin-left: 200px;
    background-color: orange;
  }

</style>


<div class="wrapper">
  <div class="outer">
    <div class="inner"></div>
  </div>
</div>
```

```javascript
var wrapper = document.getElementsByClassName('wrapper')[0],
  outer = document.getElementsByClassName('outer')[0],
  inner = document.getElementsByClassName('inner')[0];

// wrapper.addEventListener('click',function () {
//   console.log("冒泡中: wrapper " )
// },false)
// outer.addEventListener('click',function () {
//   console.log("冒泡中: outer " )
// },false)
//
// inner.addEventListener('click',function () {
//   console.log("冒泡中: inner " )//aaa
// },false)
//
//
// wrapper.addEventListener('click',function () {
//   console.log("捕获: wrapper " )
// },true)
//
// outer.addEventListener('click',function () {
//   console.log("捕获: outer " )
// },true)
//
// inner.addEventListener('click',function () {
//   console.log("捕获: inner " )//bbb
// },true)

// 点击inner部分,点击谁,谁就不存在冒泡与捕获,按照绑定顺序执行,
// 此时aaa在bbb的前面,所以才有下面ab的顺序

// 捕获: wrapper
// 捕获: outer
// 冒泡中: inner  //a
// 捕获: inner    //b
// 冒泡中: outer
// 冒泡中: wrapper


wrapper.addEventListener('click', function () {
  console.log("捕获: wrapper ")
}, true)

outer.addEventListener('click', function () {
  console.log("捕获: outer ")
}, true)

inner.addEventListener('click', function () {
  console.log("捕获: inner ")//bbb-b
}, true)

wrapper.addEventListener('click', function () {
  console.log("冒泡中: wrapper ")
}, false)
outer.addEventListener('click', function () {
  console.log("冒泡中: outer ")
}, false)

inner.addEventListener('click', function () {
  console.log("冒泡中: inner ")//aaa-a
}, false)

// 点击inner部分,点击谁,谁就不存在冒泡与捕获,按照绑定顺序执行,
// 此时aaa-a在bbb-b的后面,所以才有下面bbaa的顺序

// 捕获: wrapper
// 捕获: outer
// 捕获: inner    //bb
// 冒泡中: inner  //aa
// 冒泡中: outer
// 冒泡中: wrapper

```

## 如果不取消冒泡所带来的问题
![冒泡](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj6NNHALcHhJsJhVr3TX1vwfPpYQKXjanwg4PuroqxOzicROngicBF0VjjjNvYRS5A2J3GFOe3yrkFLw/0?wx_fmt=png)


```html
<style>
  .wrapper{
    position: relative;
    width: 300px;
    height: 300px;
    background-color: #00FF00;
  }
  .apply{
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 80px;
    height: 30px;
    background-color: red;
    color: #fff;
    line-height: 30px;
    text-align: center;
  }
</style>


<div class="wrapper">
  <div class="apply">立即申请</div>
</div>

```
```javascript
var wrapper = document.getElementsByClassName('wrapper')[0],
      apply = document.getElementsByClassName('apply')[0];

 wrapper.addEventListener('click',function () {
   console.log("详情");
 },false);
 apply.addEventListener('click',function () {
   console.log("apply");
 },false);
```


### 取消冒泡封装之后
![取消封装](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj6NNHALcHhJsJhVr3TX1vwfDroR2gu2rvlywFcWWPuC0WW36XuXElfC9n5jOhiaZS9YJ88ptH2ibsEA/0?wx_fmt=png)


```javascript
var wrapper = document.getElementsByClassName('wrapper')[0],
      apply = document.getElementsByClassName('apply')[0];

 wrapper.addEventListener('click',function () {
   console.log("详情");
 },false);
 apply.addEventListener('click',function (e) {
   var e = e || window.event;
   cancelBubble(e)
   console.log("apply");
 },false);

 // IE: e.cancelBubble = true;
 function cancelBubble(e) {
   // 兼容IE8，IE8事件存放在 window.event
   var e = e || window.event;
   if (e.stopPropagation) {
     e.stopPropagation();
   } else {
     e.cancelBubble = true;
   }
 }
```

## 取消冒泡封装

```javascript
// W3C: e.stopPropagation(); -> 存放在Event.prototype
// IE: e.cancelBubble = true;
function cancelBubble(e) {
  // 兼容IE8，IE8事件存放在 window.event
  var e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}
```

## 取消默认事件封装

```javascript
// 取消默认事件
document.oncontextmenu = function (e) {
  var e = e || window.event;
  // return false; // 兼容性最好，只能用于句柄事件绑定
  // W3C: e.preventDefault(); // IE9 不兼容
  // e.returnValue = false; // IE9以下
}

// 封装取消默认事件
function stopEvent(e) {
  var e = e || window.event;
  if (e.preventDefault) {
    // W3C
    e.preventDefault();
  } else {
    // IE9以下
    e.returnValue = false;
  }
}
```

## a标签事件阻止

```javascript
<!-- void(0) = return 0 -->
<a href="javascript:void(0)"></a>
<a href=":;"></a>
<a href="#"></a>

<script type="text/javascript">
  var a = document.getElementsByClassName('a')[0];
  a.onclick = function(e) {
  e.preventDefault()
}
</script>
```



