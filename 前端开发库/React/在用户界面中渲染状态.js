
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    const name=this.state.name

    return (

      <div>
        { /* 修改这行下面的代码 */ }
        <h1>{name}</h1>
        { /* 修改这行上面的代码 */ }
      </div>
    );
  }
};