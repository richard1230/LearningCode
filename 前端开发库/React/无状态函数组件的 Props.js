class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// 修改这行下面的代码

const Camper = (props)=> <p>{props.name}</p>
Camper.defaultProps = {
  name:"CamperBot"
}
Camper.propTypes = {
  name:PropTypes.string.isRequired
}

