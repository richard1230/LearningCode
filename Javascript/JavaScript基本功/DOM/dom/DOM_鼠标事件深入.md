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


  var oLink = document.getElementsByTagName('a')[0];
  oLink.dragNclcik(function () {
    window.open('http://www.baidu.com');
  });

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

