## 事件处理函数绑定

- DOM事件处理 `addEventListener` or `onclick = function(){}` 纯小写
- React元素也采用了类似DOM0标准中的事件属性定义的方法 小驼峰

JSX:

```jsx
<button onClick={this.doSth}></button>

```

直接创建React元素:

```jsx
React.createElement(
  'button',
  {
    onClick: {this.doSth}
  },
  '按钮'
)
```

## 阻止a标签默认行为

```jsx
class MyAlink extends React.Component {
  handleClick() {
    console.log('点击')
  }

  render() {
    return <a href="#" onClick={this.handleClick}>a链接</a>
  }
}

ReactDOM.render(
  <MyAlink/>,
  document.getElementById('app')
)

```

使用伪协议在React中会报warning

```jsx
<a href="javascript:;" onClick={this.handleClick}>a链接</a>
```

阻止默认事件 e（React事件对象，并非js原生的e）

```jsx
class MyAlink extends React.Component {
  handleClick(e) {
    e.preventDefault()
    console.log('点击', e)
  }

  render() {
    return <a href="#" onClick={this.handleClick}>a链接</a>
  }
}
```

## 事件对象

- SyntheticBaseEvent 合成基础事件对象
- 这个SBE是遵守W3C事件对象的规范的，不存在任何的浏览器兼容性问题

## this指向(重点)

ES6 class模块默认不对事件处理函数进行this的再绑定

```jsx
class MyButton extends React.Component {
  handleClick() {
    console.log('this', this)
    // this默认指向undefined
  }

  render() {
    return <button onClick={this.handleClick}>按钮</button>
  }
}

ReactDOM.render(
  <MyButton/>,
  document.getElementById('app')
)

```

```jsx
function outerClick() {
  console.log('outher-this', this)
  // 依然是undefined
}

class MyButton extends React.Component {
  render() {
    return <button onClick={outerClick}>按钮</button>
  }
}

ReactDOM.render(
  <MyButton/>,
  document.getElementById('app')
)

```

```jsx
// this指向button
<button onclick="console.log(this)">123</button>
```

### 解决this指向

- 1.在构造器中bind this 隐式传入e
- 2.在视图中bind this 隐式传入e
- 3.回调 + 箭头函数 + 方法执行（render函数每次执行时都会创建新的回调） 注意：给子组件的属性传递函数时，由于每次都创建一个回调，子组件每次都接收一个新的函数，可能触发子组件的render 显式传入e
- 4.class field写法：写在class内部的箭头函数

在构造器中bind this 隐式传入e<br>

```jsx
// 在构造器中bind this
class MyButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('this', this)
    // this指向类MyButton
  }

  render() {
    return <button onClick={this.handleClick}>按钮</button>
  }
}

```

在视图中bind this 隐式传入e<br>

```jsx
// 在视图中bind this
class MyButton extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(e) {
    // bind方法要使用e，无须传入，是隐式传入的 
    console.log('this', this, e)
    // this指向类MyButton
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>按钮</button>
  }
}

```

回调 + 箭头函数 + 方法执行（render函数每次执行时都会创建新的回调）<br>

```jsx
// 回调 + 箭头函数 + 方法执行
class MyButton extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(e) {
    // 要使用e则需要传入e
    console.log('this', this)
    // this指向类MyButton
  }

  render() {
    return <button onClick={(e) => this.handleClick(e)}>按钮</button>
  }
}

```

用在子组件上时，父组件每次render都创建一个新的回调，fn是响应的，会触发子组件的render

```jsx
    render()
{
  return (
    <div>
      <button onClick={() => this.handleClick()}>按钮</button>
      <Title fn={() => this.doSth}/>
    </div>
  )
}

```

class内部的箭头函数:

```jsx
// class内部的箭头函数
class MyButton extends React.Component {
  constructor(props) {
    super(props)
  }

  // 实验性写法
  outerClick = () => {
    console.log('outher-this', this)
    // 箭头函数的this是稳定的 指向MyButton(就是外面的这个类组件)
    //
  }

  render() {
    return (
      <div>
        <button onClick={this.outerClick}>按钮</button>
      </div>
    )
  }
}

```
- bind可以隐式 传入事件对象e(就是调用的时候可以不写e),声明的时候e必须为最后一个参数;
- 箭头函数中需要e的时候必须要传入
```jsx
class App extends React.Component {
  
  doSth(p1, p2, p3, e) {
    doSth(p1, p2, p3, e)
  }

  //bind可以隐式 传入事件对象e,e必须为最后一个参数
  doSth2(p1, p2, p3, e) {
    doSth(p1, p2, p3, e)
  }

  render() {
    return (
      <div>
        {/*箭头函数中需要e的时候必须要传入*/}
        <button onClick={(e) => this.doSth(1, 2, 3, e)}>click</button>
        {/*需要事件对象e的时候不一定要传入*/}
        <button onClick={this.doSth2.bind(this, 1, 2, 3)}>click</button>

      </div>
    )
  }
}
```


