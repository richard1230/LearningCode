## 事件流

- 定义：描述从页面中接受事件的顺序，和冒泡、捕获相关
- 微软IE 提出的事件冒泡流(Event Bubbling)
- 网景(Netscape) 提出的事件捕获流(Event Capturing)
- 事件流三个阶段：事件捕获阶段、处理目标阶段、事件冒泡阶段
- 事件冒泡：处理目标阶段 》 事件冒泡阶段
- 事件捕获：事件捕获阶段 》 处理目标阶段

## DOM级别对应事件

```
DOM0 定义 onXXX(onclick) 的两种写法
DOM1 没有定义事件模型
DOM2 
    定义addEventListener(3个参数) -> W3C规范
            removeEventListener
            attachEvent(2个参数)
            detachEvent
```

## 事件对象

事件对象(Event对象)e = new MouseEvent();//MouseEvent是构造函数

事件对象里面有很多属性： e: 事件对象(包含了事件源对象)
target,srcElement: 事件源对象

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DOM1</title>
  <style type="text/css">
    .wrapper {
      width: 100px;
      height: 100px;
      background-color: orange;
    }
  </style>
<body>

<div class="wrapper"></div>

<script type="text/javascript">
  var wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.onclick = function (e) {
    // e 事件触发之后的详细信息
    // Event 对象 = new MouseEvent()
    // IE 保存在 window.event
    var e = e || window.event; // 兼容性
    console.log(e);

    // 事件源对象: target、srcElement
    // 获取事件源：FF 只有target，IE 只有srcElement
    var tar = e.target || e.srcElement; // 兼容性写法
  }
</script>
</body>
</html>
```

## 事件委托，事件代理

需求：给li绑定事件，点击哪个li就输出对应的下标 

解决：把子元素的事件绑定到父元素上

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DOM1</title>
  <style type="text/css">
    .wrapper {
      width: 100px;
      height: 100px;
      background-color: orange;
    }
  </style>
<body>
<button>增加li</button>
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
</ul>
<script type="text/javascript">
  var oList = document.getElementsByTagName('ul')[0],
    oBtn = document.getElementsByTagName('button')[0],
    oLi = document.getElementsByTagName('li');

  // 利用冒泡机制的 事件委托
  //点击li之后,就会利用冒泡机制传给上一层的父级(这里是ul),
  // 同时获取相对应的事件对象e,以及事件源对象target
  //点击了li之后,会冒泡给它的父级(ul), ul里面有个事件对象e,
  // 事件对象里面有个属性是事件源对象target------>点击哪个元素,它就指向哪个元素
  oList.onclick = function (e) {
    var e = e || window.event, // 事件兼容性
      tar = e.target || e.srcElement; // 事件源兼容性

    // 获取内容
    console.log(this); // ul..ul
    console.log(tar); // li..li
    console.log(tar.innerText); // li的文本
    

    // 获取下标,这个是固定的套路,要熟悉!!!
    // Array.prototype.indexOf.call(DOM对象集合, 当前事件源)
    var index = Array.prototype.indexOf.call(oLi, tar);
    console.log(index);
  }

  //增加li
  oBtn.onclick = function () {
    var li = document.createElement('li');
    li.innerText = oLi.length + 1;
    oList.appendChild(li);
  }
</script>
</body>
</html>
```

