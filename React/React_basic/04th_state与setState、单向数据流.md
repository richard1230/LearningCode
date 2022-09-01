[TOC]


## 前言
- props配置：使用组件时传入数据
- state私有数据：组件内部使用的数据

> state的使用注意事项<br>
1.必须使用setState方法来更改state<br>
2.多个setState会合并调用<br>
3.props和state更新数据要谨慎（有可能在异步程序中更新）<br>
4.setState操作合并的原理：浅合并，即设置什么属性就更新什么，最终再合并成一个state<br>


```jsx
// 不要这样去更新
this.setState({
    result: this.state.result + this.props.content
})
// 使用这种方式
this.setState((state, props) => {
    // state 上一个state
    // porps 此次更新时被使用的props
    state.result = state.result + props.content
})
// 设置arr，用一个全新的数组替换，而不再使用原先的引用
this.setState({
	arr: [...this.state.arr, 4]
	// or用数组的concat方法返回新数组
})


```
## 单向数据流(Vue也是,但是Vue的数据绑定机制是双向的)
> state是组件内部特有的数据封装,只影响当前组件的UI的内部的UI<br>
> state只能传递给自己的子组件（state的安全影响范围）<br>
其他组件无法读写该组件的state<br>
组件可以通过其他组件调用时传入的属性来传递state的值<br>
props虽然是响应式的，但在组件内部是只读的<br>
组件可以没有状态<br>
组件有无状态可以切换（原先无状态，在生命周期函数/绑定的时间处理函数中增加状态）<br>
总结：这种数据（状态）从父到子，由上而下传递的方式叫单向数据流!!!<br>


```jsx
class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
  render(){
    return(
      <div>
        <h1>{this.props.title}</h1>
      </div>
    )
    
  }
}


class App extends React.Component{
  state ={
    title:'hello world, I am from App'
  }
  render (){
    return(
      <Title title = {this.state.title}/>
    )
  }
  
}
```
