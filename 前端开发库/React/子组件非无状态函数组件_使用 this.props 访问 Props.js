/*
* 子组件非无状态函数组件
*
* 任何时候，如果要引用类组件本身，可以使用 this 关键字。
* 要访问类组件中的 props，需要在在访问它的代码前面添加 this。
* 例如，如果 ES6 类组件有一个名为 data 的 prop，
* 可以在 JSX 中这样写：{this.props.data}。
*
*
* 需求:
* 在父组件 App 中渲染 Welcome 组件的一个实例。
* 在这里，给 Welcome 一个 name 的 prop，并给它赋值一个字符串。
* 在 Welcome 的子节点里，访问 strong 标签内的 name prop。


*
*
* */


class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        { /* 修改这行下面的代码 */ }
        <Welcome  name="Tom"/>
        { /* 修改这行上面的代码 */ }
      </div>
    );
  }
};

class Welcome extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        { /* 修改这行下面的代码 */ }
        <p>Hello, <strong>{this.props.name}</strong>!</p>
        { /* 修改这行上面的代码 */ }
      </div>
    );
  }
};