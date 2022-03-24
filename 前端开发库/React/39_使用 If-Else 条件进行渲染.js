class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // 修改这行下面的代码
    if(this.state.display){
      return (
        <div>
          <button onClick={this.toggleDisplay}>Toggle Display</button>
          <h1>Displayed!</h1>
        </div>
      )
    }else {
      return (
        <div>
          <button onClick={this.toggleDisplay}>TOggle Display</button>
        </div>
      )
    }


  }
};