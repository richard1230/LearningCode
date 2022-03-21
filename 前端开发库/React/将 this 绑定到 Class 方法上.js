class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello"
    };
    // 修改这行下面的代码
    this.handleClick = this.handleClick.bind(this);

    // 修改这行上面的代码
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        { /* 修改这行下面的代码 */ }
        <button onClick = {this.handleClick}>Click Me</button>
        { /* 修改这行上面的代码 */ }
        <h1>{this.state.text}</h1>
      </div>
    );
  }
};
