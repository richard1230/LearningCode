
## 基本知识
- React与ReactDOM是2个不同的库，根节点内的所有内容（和DOM更新、渲染相关）由ReactDOM来管理
- 一个React应用只有一个根节点
- 用ReactDOM.render将React元素渲染到根节点




## ReactDOM.render
```jsx
function Title() {
  return(
    <h1>This is a title</h1>
  )
}

ReactDOM.render(
  <Title/>,
  //类似上面这种包含 标签的 才为React元素,一般采用JSX语法
  //存粹的Title 只能是组件,组件又分为 函数组件和类组件
  document.getElementById('app')
)
```
- 参数1: React元素（`React.createElement(类组件/函数组件)` or `<类组件/函数组件/>` or `JSX语法组件`）包裹后函数组件才会执行

- 参数2:根节点

简单理解,`ReactDOM.render`函数接受两个参数,一个是要渲染的javascript对象(React元素),一个是渲染后的DOM元素要放置的位置


## 基本的更新逻辑
React元素是不可变的对象 immutable Object:

- 不能添加属性
- 不能修改属性（但不是深度的不可变）
- 不能删除属性
- 不能修改属性的枚举、配置、可写 （enumerable/configrable/writable）


## 虚拟DOM
> ReactDOM.render会深度对比新旧元素的状态，只会做必要的真实DOM更新

- 渲染之前 → 每个React元素组成一个虚拟DOM的对象结构 → 渲染
- 更新之前 → 形成新的虚拟DOM对象结构 → 对比新旧虚拟DOM节点 → 分析出两者不同处 → 形成一个DOM更新的补丁 → 操作真实DOM



## React createElement

React.createElement函数返回的是一个对象,大概是这个形式:
```javascript
{
  type,
  key,
  props:{
    children
  }
}
```
我们平时进行元素渲染的时候 ,一般都是这么写
```jsx
React.render(
    <div>
        <div>
            <div>content</div>
        </div>
    </div>,
    document.getElementById('example')
);
```

其实 `<div /> `这样用 尖括号包起来的部分可以看做是jsx的一个语法糖,他其实是封装了React.createElement方法,注意返回值是一个javascript对象

```jsx
React.render(
    React.createElement('div', null,
        React.createElement('div', null,
            React.createElement('div', null, 'content')
        )
    ),
    document.getElementById('example')
);
```
箭头函数中的运用 如果要返回一个对象,需要用 ( ) 将表达式包起来
```jsx
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
```
如上代码` < > `包起来的jsx代码返回的是一个对象,所以该箭头函数返回的就是一个js对象

## 参考
https://jimwmg.github.io/2017/05/15/217React-createElement/

