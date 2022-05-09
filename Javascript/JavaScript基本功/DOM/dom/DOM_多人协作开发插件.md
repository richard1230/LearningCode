## 多人协作开发

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>多人协作开发插件</title>
</head>
<body>
<input type="text" id="num1"/>
<input type="text" id="num2"/>

<div class="btn-group">
  <button data-sign="plus">+</button>
  <button data-sign="minus">-</button>
  <button data-sign="mul">*</button>
  <button data-sign="div">/</button>
</div>
<script type="text/javascript" src="utils.js"></script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript">
  var test = new Test(
    {
      num1: document.getElementById('num1'),
      num2: document.getElementById('num2'),
      btnGroup: document.getElementsByClassName('btn-group')[0]
    }
  )
  test.init();

  //init和bindEvent写在原型里面,这是固定的写法

</script>

</body>
</html>
```

```javascript
;(function () {

  var Test = function (opt) {
    this.num1 = opt.num1;
    this.num2 = opt.num2;
    this.btnGroup = opt.btnGroup;
  }

  Test.prototype = {//企业级写法
    //执行bindEevent
    init: function () {
      this.bindEvent();
    },

    bindEvent: function () {
      var btns = this.btnGroup,
        __self = this;
      //下面写事件绑定
      addEvent(btns, 'click', function (e) {
        __self.compute.call(__self, e)
      })
    },
    //自己写的插件
    compute: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,//考虑到兼容性
        val1 = parseInt(this.num1.value),
        val2 = parseInt(this.num2.value),
        btns = this.btnGroup,
        sign;

      sign = tar.getAttribute('data-sign')

      switch (sign) {
        case 'plus':
          console.log(val1 + val2);
          break;
        case 'minus':
          console.log(val1 - val2);
          break;
        case 'mul':
          console.log(val1 * val2);
          break;
        case 'div':
          console.log(val1 / val2);
          break;
        default:
          console.log('出错了');
      }
    }
  }

  window.Test = Test;

})()
```

### this访问问题

方法一：提升到封闭作用域的最顶端
```javascript
; (function () {
    var _self;
    
    var Test = function (opt) {
        _self = this;
    }
    
    Test.prototype = {
    
    }
    
    window.Test = Test;
})()

```


方法二：call/apply执行事件处理函数里面的函数
这种方法是常见的套路
```javascript
bindEvent: function () {
    var btns = this.btnGroup,
        _self = this;

    addEvent(btns, 'click', function (e) {
        _self.compute.call(_self, e)
    })
}

```
