/** @jsx React.DOM */
var React = require('react');

var UPDATE_LINE_DELAY = 200;

var BacklogLine = React.createClass({
    displayName: 'BacklogLine',
    getInitialState: function () {
      return {
        updateTimer: null
      }
    },
    render: function () {
        return (
          <tr>
            <td colSpan="6" className="the-line">
              <form className="form-inline" onChange={this._updateGoal}>
                Planned for next sprint: {this.props.pointsAbove} points. Goal:
                <div className="form-group">
                  <input className="form-control" type="text" value={this.props.pointsGoal} />
                </div>
              </form>
            </td>
          </tr>
        );
    },
    _updateGoal: function (e) {
      e.preventDefault();
      if(this.state.updateTimer) { clearTimeout(this.state.updateTimer); }
      var updateGoal = this.props.updateGoal,
        newGoal = e.target.value,
        updateTimer = setTimeout(function () {
          updateGoal(newGoal);
        }, UPDATE_LINE_DELAY);
      this.setState({updateTimer: updateTimer});
    }
});

module.exports = BacklogLine;