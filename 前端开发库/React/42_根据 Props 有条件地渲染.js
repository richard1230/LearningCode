class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    {/* 修改这行下面的代码 */}
    return <h1>
      {this.props.fifthFifty ? "YOU WIN" : "YOU LOSE"}
    </h1>;
    {/* 修改这行上面的代码 */}
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState( {
      // 完成 return 语句
      counter: this.state.counter + 1 // change code here

    });
  }
  render() {
    const expression = Math.random() >= 0.5 ? true :false ; // 修改这一行
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        {/* 修改这行下面的代码 */}
          <Results fiftyFifty={expression}/>
        {/* 修改这行上面的代码 */}
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}