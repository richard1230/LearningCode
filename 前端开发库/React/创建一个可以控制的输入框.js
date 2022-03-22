class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    // 修改这行下面的代码
    this.handleChange = this.handleChange.bind(this)
    // 修改这行上面的代码
  }

  // 修改这行下面的代码
  handleChange(event) {
    this.setState(
      {
        input: event.target.value
      }
    )
  }

  // 修改这行上面的代码
  render() {
    return (
      <div>
        { /* 修改这行下面的代码 */}
        <input value={this.state.input} onChange={this.handleChange}/>
        { /* 修改这行上面的代码 */}
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};