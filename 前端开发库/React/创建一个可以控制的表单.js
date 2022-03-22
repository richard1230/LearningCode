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
    event.preventDefault()
    this.setState({
      submit: this.state.input
    });
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