class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }
  render() {
    return (
      <div>
        {/* 修改这行下面的代码 */}
        <Navbar name={this.state.name}/>
        {/* 修改这行上面的代码 */}
      </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {/* 修改这行下面的代码 */}
        <h1>Hello, my name is:{this.props.name} </h1>
        {/* 修改这行上面的代码 */}
      </div>
    );
  }
}

