var React = require('react'),
  UserStore = require('../../stores/user_store');

var BacklogLine = React.createClass({
  displayName: 'BacklogLine',
  render: function () {
    var pointsByTechList = this._pointsByTechList(this.props.pointsByTech);
    return (
      <tr>
        <td colSpan="6" className="the-line">
          <div className="row">
            <div className="col-xs-10">
              {pointsByTechList}
            </div>
            <div className="col-xs-2">
              Planned: {this.props.pointsAbove} points
            </div>
          </div>
        </td>
      </tr>
    );
  },
  _pointsByTechList: function (pointsByTech) {
    var list = [];
    for(let name in pointsByTech) {
      list.push(<span className="tech-with-points" key={name}>
         {UserStore.find(name).name}: { pointsByTech[name] }
      </span>);
    }
    return list;
  }
});

module.exports = BacklogLine;
