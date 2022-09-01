[TOC]

## 基本知识

组件：视图的片段、内部管理数据集合（state）; 外部传入配置结合（props）

包含：

- 视图标记（React的JSX、Vue的template）需要经过转换而成为真实的DOM
- 事件
- 数据
- 逻辑（存储storage、数据结构化处理）
- 外部的配置



## 组件渲染过程(掌握)

- React主动调用Test自定义组件
- 将属性集合转换对象 `props → { title: 'xxx'}`
- 将对象作为props传入组件
- 替换JSX中的props或者state中的变量
- ReactDOM将最终的React元素通过一系列操作转换成真实DOM进行渲染

## 组件调用规范

- 视图标记：HTML标签` <h1></h1>`
- 大驼峰写法作为一个React元素 `<Mytitle />`组件 → `JSX` → `React元素`
- 组件转换React元素 React.createElement参考下面代码

### 使用props（类组件）

```jsx
class Test extends React.Component {
  //属性->配置--> props保存
  constructor(props) {
    super(props)
  }

  //数据-->内部数据--->state
  state = {
    title: this.props.title
  }

  changeTitle() {
    //逻辑
    this.setState({
      title: 'new title'
    })
  }

  render() {
    //视图
    return (
      <div>
        <h1>{this.state.title}</h1>
        //如果没有bind(this)，那么这里的this指向的是button组件,
        //加了之后就变为指向外层的Test组件了
        <button onClick={this.changeTitle.bind(this)}>Change</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Mytitle title="init title"/>,
  document.getElementById('app')
)

```

### 使用hooks（函数组件，不写class了）

- 函数组件一定要是一个纯函数（入参不可修改，能保证绝对的复用性）
- 注意onClick绑定的不是函数执行setTitle('new title')，而应该是一个匿名函数或者用bind返回一个函数

```jsx
function Test(props) {
  const [title, setTitle] = React.useState(props.title);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setTitle('this is my Component')}>Click</button>
      //这里的箭头函数就等于匿名函数: function(){setTitle('this is my Component')}
    </div>
  )
}


ReactDOM.render(
  <Test title='this is a  function Component'/>,
  document.getElementById('app')
)
```

## 属性props与状态state区别

1. state => 数据池{} 组件内部的管理数据的容器 => 组件内部可读可写(state可读可写)<br>
2. props => 属性池{} 外部调用组件时传入的属性集合 => 组件内部可读不可写(props只读不可写)<br>

组件外部的数据 -> 组件内部时应该有权限修改的<br>


state与props的结合:<br>
content => props => outer => 外部配置<br>
state => content => default => props.content

```jsx
//props的只读性
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  state = {
    content: this.props.content
  }

  contentChange() {
    this.state({
      content: '123'
    })
  }

  // contentChange(){
  //   this.props.content = '123';//错误写法
  // }
  render() {
    return (
      <div>
        {/*<h1>{this.props.content}</h1>  错误写法*/}
        <h1>{this.state.content}</h1>
        <button onClick={this.contentChange.bind(this)}>Click</button>
      </div>
    )
  }

}

```

