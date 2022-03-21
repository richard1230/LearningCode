
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        { /* 修改这行下面的代码 */ }
        <h1>{this.state.name}</h1>
        { /* 修改这行上面的代码 */ }
      </div>
    );
  }
};