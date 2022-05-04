## 前言

注意:这几个封装一定要练习的非常熟练

## 遍历一个父元素的子元素节点

```javascript
//遍历一个父元素的子元素节点
Element.prototype.elemChildren = function (index) {
  var childNodes = this.childNodes,
    len = childNodes.length,
    item;
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };
  for (let i = 0; i < len; i++) {
    item = childNodes[i];

    if (item.nodeType === 1) {
      temp.push(item)
    }
  }

  if (index !== undefined && typeof (index) !== 'number') {//存在且不为number类型,就是string类型
    return undefined;
  }
  return index === undefined ? temp : temp[index];
}
```

## 遍历一个节点的所有子节点,包含孙子节点

```javascript
function getFullchildren(node) {
  var children = node.children,
    len = children.length,
    item;
  if (node && node.nodeType === 1) {
    console.log(node);
  }

  for (var i = 0; i < len; i++) {
    item = children[i];

    if (item.nodeType === 1) {
      getFullchildren(item)
    }
  }
}

```

## 在原型上面写一个元素的第N层父级元素

```javascript
Element.prototype.elemParent = function (n) {
  var type = typeof n,
    elem = this;
  if (type === 'undefined' || type !== "number") {
    return elem.parentNode;
  } else if (n < 0) {
    return undefined;
  }

  while (n) {
    if (elem.nodeName === 'HTML') {
      elem = null
      return elem
    }
    elem = elem.parentNode;
    n--;
  }
  return elem;
}

```

## 寻找兄弟节点

```html

<div>
  <p>p标签</p>
  <h1>h1标签</h1>
  <a href="">超级链接</a>
  <strong>strong</strong>
  <em>em</em>
  <h2>h2</h2>
</div
```

```javascript
  var a = document.getElementsByTagName('a')[0];
Element.prototype.elemParent = function (n) {
  var type = typeof (n),
    elem = this;

  if (type === 'undefined' || type !== 'number') {
    return elem.parentNode;
  } else if (n < 0) {
    return undefined
  }


  while (n) {
    if (elem.nodeName === 'HTML') {
      elem = null
      return elem
    }
    elem = elem.parentNode;
    n--;
  }
  return elem
}

console.log(a.elemParent(3))

```

## 元素逆序

```html

<div>
  <h1>11111</h1>
  <a href="">22222</a>
  <p>333333</p>
  <strong>44444</strong>
  <ul>
    <li>999</li>
  </ul>
  <ul>
    <li>99909</li>
  </ul>
</div>
```

```javascript
//div是包裹我们想要逆序节点的节点
var div = document.getElementsByTagName('div')[0],
  children = div.childNodes,
  len = children.length;


while (len--) {
  console.log(children[len]);
  div.appendChild(children[len]);
}

```

## 时钟

```html

<div>
  <p></p>
</div>
```

```javascript
var p = document.getElementsByTagName('p')[0];

setInterval(function () {
  p.innerHTML = new Date().getDateTime();
}, 1000)

Date.prototype.getDateTime = function () {
  var year = this.getFullYear(),
    month = this.getMonth() + 1,
    day = this.getDate(),
    hours = this.getHours(),
    minutes = this.getMinutes(),
    seconds = this.getSeconds();

  function setZero(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

  return year + '-' + setZero(month) + '-' + setZero(day) + ' ' + setZero(hours) +
    ':' + setZero(minutes) + ':' + setZero(seconds);
}
```

## 倒计时

```javascript
 var oPara = document.getElementsByTagName('p')[0],
  endTime = new Date(2022, 5, 15, 23, 59, 59).getTime(),
  t = null;

t = setInterval(function () {
  oPara.innerHTML = new Date().countDown(endTime, t);
}, 1000)

Date.prototype.countDown = function (endTime, timer) {
  var nowTime = this.getTime(),
    lefTime = (endTime - nowTime) / 1000,
    d, h, m, s;

  if (lefTime >= 0) {
    d = Math.floor(lefTime / 60 / 60 / 24);
    h = Math.floor(lefTime / 60 / 60 % 24);
    m = Math.floor(lefTime / 60 % 60);
    s = Math.floor(lefTime % 60);
  } else {
    clearInterval(timer)
  }

  return d + '天' + h + '时' + m + '分钟' + s + '秒';
}


// Math.round(-5.3)//-5
// Math.round(-5.5)//-5
// Math.round(-5.6)//-6
// Math.round(5.5)//6

```

## 查看滚动条的距离

```javascript
//封装的是滚动条的位移
//封装滚动条,考虑到兼容性了,很重要!下面是企业的写法
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      //两者一般只有一个有效,故写为加法
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

```

## 封装可视窗口

```javascript
  //下面是考虑过兼容性之后的封装可视窗口
function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } else {
    if (document.compatMode === "BackCompat") {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

getViewportSize();
```

## 封装html文档的高度和宽度

```javascript
//封装html文档的高度和宽度
function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

getScrollSize()
```

## 获取元素距离窗口左上角的位置距离

```html

<style>
  body {
    margin: 0;
  }

  .grandPa {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 360px;
    height: 360px;
    background-color: #ccc;
  }

  .parent {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 300px;
    height: 300px;
    background-color: #999;
    overflow: hidden;
  }

  .son {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 100px;
    height: 100px;
    background-color: #00FF00;
  }
</style>

<div class="grandPa">
  <div class="parent">
    <div class="son">
    </div>
  </div>
</div>
```

```javascript
 // 获取元素距离窗口左上角的位置距离
var son = document.getElementsByClassName('son')[0];

// 获取元素距离窗口左上角的位置距离
function getElemToDocPosition(el) {
  var parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }

}

getElemToDocPosition(son);
```

## 获取元素的样式属性

```javascript
// 查看css属性的方法
//   elem.style 里面有CSSStyleDeclaration属性
// 查看计算样式，常规：
// window.getComputeStyle(elem, null)[prop];
//   window.getComputeStyle(elem, null).prop;
//   E8 及以下：
// elem.currentStyle
//获取元素的样式属性====>兼容了不同的浏览器
function getStyles(el, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return parseInt(window.getComputedStyle(el, null)[prop]);
    } else {
      return window.getComputedStyle(el, null);
    }
  } else {
    if (prop) {
      return parseInt(el.currentStyle[prop]);
    } else {
      return el.currentStyle;
    }
  }
}

getStyles(oDiv, 'height')
```