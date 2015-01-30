/** @jsx React.DOM */
var React = require('react');

var BacklogLine = React.createClass({
  displayName: 'BacklogLine',
  getInitialState: function () {
    return {
      updateTimer: null,
    }
  },
  render: function () {
    var pointsByTechList = this._pointsByTechList();
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
  _pointsByTechList: function () {
    var techsWithPoints = this.props.pointsByTech;
    var list = [];
    var techNames = Object.keys(techsWithPoints);
    for(var i = 0; i < techNames.length; i++) {
      list.push(<span className="tech-with-points" key={techNames[i]}>
         {techNames[i]}: { techsWithPoints[techNames[i]] }
      </span>);
    }
    return list;
  }
});

module.exports = BacklogLine;