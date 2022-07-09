## 前置知识

鼠标点击<br>
鼠标右键、中键没有onclick事件，有onmouseup事件<br>
e.button 左中右分别对应012 <br>
IE10以上使用，否则就不要去添加这些事件了<br>
鼠标右键事件contextmenu  <br>
模拟双击事件，两次点击的时间间隔 < 200ms  <br>

点击事件 = mousedown + mouseup  <br>
position: absolute 会将内联元素变为块级（比如a） <br>
a标签的协议限定符（伪协议，防止跳转和刷新，让href不生效），javascript:;，可以让点击和拖拽分离<br>
模块的声明：xx变量 = function () { } / IIFE   <br>
等待型模块和立即执行的模块   <br>
用按下、抬起的时间差值来判断是拖拽还是点击   <br>

## 模块拖动案例

需求:
点击的时候跳转 <br>
拖动鼠标抬起的时候不跳转 <br>
鼠标拖动并跳转链接的时候回到原位<br>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<style>
  body {
    margin: 0;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: green;
  }

  div {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: orange;
  }
</style>
<body>
<a href="javascript:;"></a>
<div></div>

<script type="text/javascript" src="./utils.js"></script>
<script type="text/javascript">
  // 点击的时候跳转
  // 拖动鼠标抬起的时候不跳转
  // 鼠标拖动并跳转链接的时候回到原位
  var dragNclcik = (function (elem, elemclick) {

    var bTime = 0, // 记录点击时间
      eTime = 0,
      oPos = []; // 记录原先位置

    drag();

    function drag() {
      var x,
        y;

      addEvent(elem, 'mousedown', function (e) {
        var e = e || window.event;
        bTime = new Date().getTime();
        oPos = [getStyles(elem, 'left'), getStyles(elem, 'top')]
        x = pagePos(e).X - getStyles(elem, 'left');
        y = pagePos(e).Y - getStyles(elem, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        stopEvent(e);
      })

      function mouseMove(e) {
        var e = e || window.event;

        elem.style.top = pagePos(e).Y - y + 'px';
        elem.style.left = pagePos(e).X - x + 'px';
      }

      function mouseUp(e) {
        var e = e || window.event;
        eTime = new Date().getTime();

        console.log(eTime - bTime);
        console.log(oPos[0]);


        if (eTime - bTime < 100) {
          elem.style.left = oPos[0] + 'px';
          elem.style.top = oPos[1] + 'px';
          elemclick();
        }
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
      }
    }
  })
  var oLink = document.getElementsByTagName('a')[0];
  dragNclcik(oLink, function () {
    window.open('http://www.baidu.com');
  });


  //写到原型上面
  Element.prototype.dragNclcik = (function (elemclick) {

    var bTime = 0, // 记录点击时间
      eTime = 0,
      oPos = []; // 记录原先位置

    drag.call(this);

    function drag() {
      var x,
        y,
        _self = this;

      addEvent(_self, 'mousedown', function (e) {
        var e = e || window.event;
        bTime = new Date().getTime();
        oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')]
        x = pagePos(e).X - getStyles(_self, 'left');
        y = pagePos(e).Y - getStyles(_self, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancleBubble(e);
        preventDefaultEvent(e);
      })

      function mouseMove(e) {
        var e = e || window.event;

        _self.style.top = pagePos(e).Y - y + 'px';
        _self.style.left = pagePos(e).X - x + 'px';
      }

      function mouseUp(e) {
        var e = e || window.event;
        eTime = new Date().getTime();

        console.log(eTime - bTime);
        console.log(oPos[0]);


        if (eTime - bTime < 100) {
          _self.style.left = oPos[0] + 'px';
          _self.style.top = oPos[1] + 'px';
          elemclick();
        }
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
      }
    }
  })

  // //调用
  // var oLink = document.getElementsByTagName('a')[0];
  // oLink.dragNclcik(function () {
  //   window.open('http://www.baidu.com');
  // });

</script>


</body>
</html>
```

### 解决模块边界问题

![边界问题的两个极端位置](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7mrvTZjZ2FFN0vebQqPACmxianUibm6P4bnpDroiaIpoN5v5H85RhBX4h3nQb1YmslrUjTZiakb4Rpww/0?wx_fmt=png)

```javascript
 Element.prototype.dragNclcik = (function (elemclick) {

  var bTime = 0, // 记录点击时间
    eTime = 0,
    oPos = [], // 记录原先位置
    wWidth = getViewportSize().width,
    wHeight = getViewportSize().height,
    elemWidth = getStyles(this, 'width'),
    elemHeight = getStyles(this, 'height');

  drag.call(this);

  function drag() {
    var x,
      y,
      _self = this;

    addEvent(_self, 'mousedown', function (e) {
      var e = e || window.event;
      bTime = new Date().getTime();
      oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')]
      x = pagePos(e).X - getStyles(_self, 'left');
      y = pagePos(e).Y - getStyles(_self, 'top');

      addEvent(document, 'mousemove', mouseMove);
      addEvent(document, 'mouseup', mouseUp);
      cancleBubble(e);
      preventDefaultEvent(e);
    })

    function mouseMove(e) {
      var e = e || window.event,
        elemLeft = pagePos(e).X - x,
        elemTop = pagePos(e).Y - y;

      //处理边界问题
      if (elemLeft <= 0) {
        elemLeft = 0;
      } else if (elemLeft >= wWidth - elemWidth) {//两个极端位置见上图
        elemLeft = wWidth - elemWidth - 1;  // 避免误差
      }

      if (elemTop <= 0) {
        elemTop = 0;
      } else if (elemTop >= wHeight - elemHeight) {
        elemTop = wHeight - elemHeight - 1;
      }

      _self.style.top = elemTop + 'px';
      _self.style.left = elemLeft + 'px';
    }

    function mouseUp(e) {
      var e = e || window.event;
      eTime = new Date().getTime();

      console.log(eTime - bTime);
      console.log(oPos[0]);


      if (eTime - bTime < 100) {
        _self.style.left = oPos[0] + 'px';
        _self.style.top = oPos[1] + 'px';
        elemclick();
      }
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
})


var oLink = document.getElementsByTagName('a')[0];
oLink.dragNclcik(function () {
  window.open('http://www.baidu.com');
});

```

### 几个注意点汇总:

```javascript
 var dragNclcik = (function (a, b) {
  //这是模块的写法
  console.log(a, b)
})

dragNclcik(3, 4)

// 写到原型上:
Element.prototype.dragNclcik = (function () {
})

// dragNclcik(ele,fn)--->改为ele.dragNclcik(fn)


this指向问题:

  function a() {
    console.log(this);//this指向调用它的对象
    drag.call(this);//改变this指向,如果不这么写,drag里面的this
    //将会指向window,改完之后,里面的this将和外面的一样
    //this指向调用它的对象

    function drag() {

      var _self = this//将外层的this保存下来
      addEvent(_self, event1, fn1);//这里写this原因:想要的是外面的this
      //addEvent里面的this就是这个函数的第一个参数,这里的event1事件需要的是外面的this
      addEvent(document, event2, fn2);//这里的event2事件不需要外面的this
    }
  }

```

### 解决右击菜单边界问题

![图](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7haxYKCHicibSzktf4uqmVa87nIJtDkicSDFtIyVusM6ibDxogcibZKptWnLbVa6P7VXHxenh00Fegyag/0?wx_fmt=png)

```javascript

Element.prototype.dragNclcik = (function (menu, elemclick) {

  var bTime = 0, // 记录点击时间
    eTime = 0,
    oPos = [], // 记录原先位置
    wWidth = getViewportSize().width,
    wHeight = getViewportSize().height,
    elemWidth = getStyles(this, 'width'),
    elemHeight = getStyles(this, 'height'),
    mWidth = getStyles(menu, 'width'),
    mHeight = getStyles(menu, 'height');

  drag.call(this);

  function drag() {
    var x,
      y,
      _self = this;

    addEvent(_self, 'mousedown', function (e) {
      var e = e || window.event,
        btnCode = e.button;
      if (btnCode === 2) {
        var mLeft = pagePos(e).X,
          mTop = pagePos(e).Y;

        if (mLeft <= 0) {
          mLeft = 0;
        } else if (mLeft >= wWidth - mWidth) {
          mLeft = pagePos(e).X - mWidth;//详细解释见上图
        }

        if (mTop <= 0) {
          mTop = 0;
        } else if (mTop >= wHeight - mHeight) {
          mTop = pagePos(e).Y - mHeight;
        }

        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';

      } else if (btnCode === 0) {//左键
        bTime = new Date().getTime();
        oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')]
        menu.style.display = 'none';

        x = pagePos(e).X - getStyles(_self, 'left');
        y = pagePos(e).Y - getStyles(_self, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        stopEvent(e);
      }

    })

    addEvent(document, 'contextmenu', function (e) {//去除默认事件
      var e = e || window.event;
      preventDefaultEvent(e);
    })

    addEvent(document, 'click', function (e) {
      menu.style.display = 'none';
    })

    addEvent(menu, 'click', function (e) {
      cancelBubble(e)//取消冒泡,如果没有这里的代码,
      // 右击出现menu部分,在点击menu部分时,menu会消失,我们想要的效果为不消失,menu的父元素为document,
      //如果不取消冒泡,document 也会执行 menu.style.display = 'none';

    })

    function mouseMove(e) {
      var e = e || window.event,
        elemLeft = pagePos(e).X - x,
        elemTop = pagePos(e).Y - y;

      if (elemLeft <= 0) {
        elemLeft = 0;
      } else if (elemLeft >= wWidth - elemWidth) {
        elemLeft = wWidth - elemWidth - 1;  // 避免误差
      }

      if (elemTop <= 0) {
        elemTop = 0;
      } else if (elemTop >= wHeight - elemHeight) {
        elemTop = wHeight - elemHeight - 1;
      }

      _self.style.top = elemTop + 'px';
      _self.style.left = elemLeft + 'px';
    }

    function mouseUp(e) {
      var e = e || window.event;
      eTime = new Date().getTime();

      console.log(eTime - bTime);
      console.log(oPos[0]);


      if (eTime - bTime < 100) {
        _self.style.left = oPos[0] + 'px';
        _self.style.top = oPos[1] + 'px';
        elemclick();
      }
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
})

var oLink = document.getElementsByTagName('a')[0],
  oMenu = document.getElementsByTagName('div')[0];
oLink.dragNclcik(oMenu, function () {
  window.open('http://www.baidu.com');
});

```

## 双击事件

```javascript
 Element.prototype.dragNclcik = (function (menu, elemclick) {

  var bTime = 0, // 记录点击时间
    eTime = 0,
    oPos = [], // 记录原先位置
    cbTime = 0,
    ceTime = 0,
    counter = 0,
    t = null,
    wWidth = getViewportSize().width,
    wHeight = getViewportSize().height,
    elemWidth = getStyles(this, 'width'),
    elemHeight = getStyles(this, 'height'),
    mWidth = getStyles(menu, 'width'),
    mHeight = getStyles(menu, 'height');

  drag.call(this);

  function drag() {
    var x,
      y,
      _self = this;

    addEvent(_self, 'mousedown', function (e) {
      var e = e || window.event,
        btnCode = e.button;
      if (btnCode === 2) {
        var mLeft = pagePos(e).X,
          mTop = pagePos(e).Y;

        if (mLeft <= 0) {
          mLeft = 0;
        } else if (mLeft >= wWidth - mWidth) {
          mLeft = pagePos(e).X - mWidth;
        }

        if (mTop <= 0) {
          mTop = 0;
        } else if (mTop >= wHeight - mHeight) {
          mTop = pagePos(e).Y - mHeight;
        }

        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';

      } else if (btnCode === 0) {
        bTime = new Date().getTime();
        oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')]
        menu.style.display = 'none';

        x = pagePos(e).X - getStyles(_self, 'left');
        y = pagePos(e).Y - getStyles(_self, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancleBubble(e);
        preventDefaultEvent(e);
      }

    })

    addEvent(document, 'contextmenu', function (e) {
      var e = e || window.event;
      preventDefaultEvent(e);
    })

    addEvent(document, 'click', function (e) {
      menu.style.display = 'none';
    })

    addEvent(menu, 'click', function (e) {
      cancleBubble(e)
    })

    function mouseMove(e) {
      var e = e || window.event,
        elemLeft = pagePos(e).X - x,
        elemTop = pagePos(e).Y - y;

      if (elemLeft <= 0) {
        elemLeft = 0;
      } else if (elemLeft >= wWidth - elemWidth) {
        elemLeft = wWidth - elemWidth - 1;  // 避免误差
        //浏览器可能有计算误差，可以适当将范围缩小1像素，防止出现滚动条
      }

      if (elemTop <= 0) {
        elemTop = 0;
      } else if (elemTop >= wHeight - elemHeight) {
        elemTop = wHeight - elemHeight - 1;
        //浏览器可能有计算误差，可以适当将范围缩小1像素，防止出现滚动条
      }

      _self.style.top = elemTop + 'px';
      _self.style.left = elemLeft + 'px';
    }

    function mouseUp(e) {
      var e = e || window.event;
      eTime = new Date().getTime();

      if (eTime - bTime < 200) {
        _self.style.left = oPos[0] + 'px';
        _self.style.top = oPos[1] + 'px';

        counter++;

        if (counter === 1) {
          cbTime = new Date().getTime();
        }

        if (counter === 2) {
          ceTime = new Date().getTime();
        }

        if (cbTime && ceTime && (ceTime - cbTime < 200)) {
          console.log(ceTime - cbTime, counter);
          elemclick();
        }

        t = setTimeout(function () {
          cbTime = 0;
          ceTime = 0;
          counter = 0;
          clearTimeout(t)
        }, 500);

      }

      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
})


var oLink = document.getElementsByTagName('a')[0],
  oMenu = document.getElementsByTagName('div')[0];
oLink.dragNclcik(oMenu, function () {
  window.open('http://www.baidu.com');
});



```

（1）为什么要清除计时器？ 因为计时器是保存在内存里面的，不用了把它清除是一种好习惯

（2）为什么要清零

```javascript
cbTime = 0;
ceTime = 0;
counter = 0;
```

因为你点击第一次的时候会保存cbTime

第二次点击会保存ceTime

但是如果ceTime - cbTime ≮ 200的话，cbTime、ceTime、counter就不会清零，也不会执行函数

往后点counter就会从2一直往后加，往后加就不会重新获取时间戳，然后cbTime、ceTime一直都是固定的，而且ceTime - cbTime ≮ 200，就一直进入不到if语句里面

所以要进行清零，因为当ceTime - cbTime ≮ 200的时候，就可以重新获取时间戳，然后计算它们的差值

（3）为什么要用延时器清零？

```javascript
t = setTimeout(function () {
  cbTime = 0;
  ceTime = 0;
  counter = 0;
  clearTimeout(t)
}, 500);

```

因为当你只点击了一次的时候，它没有清除，然后下一次双击的时候就会出现问题，因为counter是从第一次点击时开始计算的，就是从1开始加，加到2、3，当你第二次进行双击的时候ceTime - cbTime 肯定就大于
200毫妙了，然后就进入不到if语句，只要counter不清零，就永远不会重新获取时间戳，不重新获取时间戳就无法重新计算ceTime - cbTime，就进入不到语句。

所以设置延时器清零，就是为当你只点击了1次的情况，它会延迟500毫妙自动给你清零，然后你下一次双击的时候，就可以重新获取时间戳，重新计算ceTime - cbTime，从而进入语句。

utils.js代码地址

https://github.com/richard1230/CodeLearning/blob/main/Javascript/JavaScript%E5%9F%BA%E6%9C%AC%E5%8A%9F/DOM/dom/utils.js


