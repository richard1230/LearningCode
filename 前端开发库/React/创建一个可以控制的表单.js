class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit(event) {
    // 修改这行下面的代码
    this.setState(
      {
        submit:this.state.input
      }
    )
    even.preventDefault()
    // 修改这行上面的代码
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* 修改这行下面的代码 */}
           <input value={this.state.input} onChange={this.handleChange}/>
          {/* 修改这行上面的代码 */}
          <button type='submit'>Submit!</button>
        </form>
        {/* 修改这行下面的代码 */}
      <h1>{this.state.submit}</h1>
        {/* 修改这行上面的代码 */}
      </div>
    );
  }
}