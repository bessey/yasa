var React = require('react'),
  StoryList = require('./story_list'),
  StoryEditor = require('./story_editor'),
  StoryActions = require('../actions/story_actions'),
  LineActions = require('../actions/line_actions');

var editingId, editingStory;

module.exports = React.createClass({
  displayName: 'Backlog',
  getInitialState: function () {
    return {
      pointsGoal: 0
    };
  },
  render: function () {
    return (
      <div className="backlog">
        <h1>Backlog</h1>
        <div className="row">
          <div className="col-xs-6">
            <button
              className="btn btn-primary btn-large"
              data-toggle="modal"
              onClick={this._addNewStory}
              data-target="#add-story-dialogue">
              Add a Story
            </button>
          </div>
          <div className="col-xs-6">
            Goal for next sprint: <input className="points-goal" type="number" value={this.state.pointsGoal} onChange={this._updateGoal} />
            points
          </div>
        </div>
        <StoryList line={this.props.line} stories={this.props.stories} />
        <StoryEditor />
      </div>
    );
  },
  componentWillReceiveProps: function (newProps) {
    var pointsGoal = newProps.line.pointsGoal;
    if(pointsGoal) {
      this.setState({pointsGoal: pointsGoal});
    }
  },
  _addNewStory: function () {
    StoryActions.openEditor();
  },
  _updateGoal: function (e) {
    e.preventDefault();
    var newGoal = Number.parseInt(e.target.value);
    if(Number.isNaN(newGoal)) {
      newGoal = 0;
    }
    LineActions.updateGoal(newGoal);
    this.setState({pointsGoal: newGoal});
  }
});
