/** @jsx React.DOM */
var React = require('react'),
  LineActions = require('../actions/line_actions');

var UPDATE_LINE_DELAY = 200;

var BacklogLine = React.createClass({
    getInitialState: function () {
      return {
        updateTimer: null
      }
    },
    render: function () {
      var pointsByTechList = this._pointsByTechList();
      return (
        <tr>
          <td colSpan="6" className="the-line">
            <form onChange={this._updateGoal}>
              Planned for next sprint: {this.props.pointsAbove} points. Goal:
              <input className="points-goal" type="text" defaultValue={this.props.pointsGoal} />
              Points by Tech: {pointsByTechList}
            </form>
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
    },
    _updateGoal: function (e) {
      e.preventDefault();
      if(this.state.updateTimer) { clearTimeout(this.state.updateTimer); }
      var newGoal = e.target.value,
        updateTimer = setTimeout(function () {
          LineActions.updateGoal(newGoal);
        }, UPDATE_LINE_DELAY);
      this.setState({updateTimer: updateTimer});
    }
});

module.exports = BacklogLine;