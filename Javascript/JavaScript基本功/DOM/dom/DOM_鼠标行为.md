## 坐标系

![坐标系](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj6QpHTML3CL72QnsR3ZHwY6FvwMdyBtY52SsQia2LBL99yWAoLK7mMHS4TlMJZjibVIl1aicFPicU4dYg/0?wx_fmt=png)

```
clientX/Y 鼠标位置相对于当前可视区域的坐标(不包含滚动条的距离)
x/y 同clientX/Y相同，FF老版不支持

pageX/pageY 鼠标位置相对于当前文档的坐标(包含滚动条的距离)，IE9以下不支持
layerX/Y 同pageX/pageY相同，IE11以下同clientX/Y

screenX/Y 鼠标位置相对于屏幕的坐标

offsetX/Y 鼠标位置相对于块元素的坐标(包括边框，safari不包括边框)

```

## 获取文档中位置坐标封装

就是封装pageX,与pageY

```javascript
// 获取坐标封装
function pagePos(e) {
  // 获取滚动距离
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    // 获取文档偏移
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}

```

## 基本拖拽行为

![基本行为](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj6NNHALcHhJsJhVr3TX1vwfXqcrJiazHibC80Xic3r5oZGpwz17hp08uVFcWUuq1wnao4dIFUdKdfgQg/0?wx_fmt=png)

```html

<style>
  .box {
    position: absolute;
    top: 200px;
    left: 200px;
    width: 100px;
    height: 100px;
    background-color: orange;
  }
</style>
<div class="box"></div>
```

```javascript
 var box = document.getElementsByClassName('box')[0];

document.onmousedown = function (e) {
  var e = e || window.event,
    x = pagePos(e).X - getStyles(box, 'left');
  y = pagePos(e).Y - getStyles(box, 'top');

  document.onmousemove = function (e) {
    var e = e || window.event;

    box.style.left = pagePos(e).X - x + 'px';
    box.style.top = pagePos(e).Y - y + 'px';

  }

  document.onmouseup = function (e) {
    this.onmousemove = null;
    this.onmouseup = null;
  }
}

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

function pagePos(e) {
  // 获取滚动距离
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    // 获取文档偏移
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}

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


### 封装拖拽

拖拽mousedown mouseup mousemove

```javascript
var box = document.getElementsByClassName('box')[0];
elemDrag(box);

// 封装拖拽函数
function elemDrag(el) {
  var x,
    y;

  addEvent(el, 'mousedown', function(e){
    var e = e || window.event;
    x = pagePos(e).X - getStyles(el, 'left');
    y = pagePos(e).Y - getStyles(el, 'top');

    addEvent(document, 'mousemove', mouseMove);
    addEvent(document, 'mouseup', mouseUp);

    // 去掉冒泡
    cancelBubble(e);
    // 取消默认事件
    stopEvent(e);
  });

  function mouseMove(e) {
    var e = e || window.event;
    el.style.left = pagePos(e).X - x + 'px';
    el.style.top = pagePos(e).Y - y + 'px';
  }

  function mouseUp(e) {
    var e = e || window.event;
    removeEvent(document, 'mousemove', mouseMove);
    removeEvent(document, 'mouseup', mouseUp);
  }
}
```