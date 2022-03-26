class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  // 在这里添加 handleChange() 和 submitMessage() 方法
  handleChange(event){
    this.setState(
      {
        // message:msg,
        input: event.target.value
      }
    )
  }
  submitMessage(){
    const msg = this.state.input.trim()!==''?[...this.state.messages,this.state.input]:[...this.state.messages]
    this.setState(
      {
         message:msg,
        input:''
      }
    )
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* 在这一行下面渲染一个输入框（input），按钮（button）和列表（ul） */ }
        <input onChange={this.handleChange}
               value={this.state.input}/>
        <button onClick={this.submitMessage}>Add message</button>
        <ul>
          {items}
        </ul>
        { /* 修改这行上面的代码 */ }
      </div>
    );
  }
};