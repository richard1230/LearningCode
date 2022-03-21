class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    // 只修改这一行下面的代码
     this.state={
       name:"Name"
     }
    // 只修改这一行上面的代码
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};