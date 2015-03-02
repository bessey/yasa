let React = require('react'),
  StoryList = require('./backlog/story_list'),
  StoryEditor = require('./story_editor'),
  StoryActions = require('../actions/story_actions'),
  LineActions = require('../actions/line_actions'),
  TaskActions = require('../actions/task_actions'),
  LineUtils = require('../lib/line_utils'),
  Router = require('react-router'),
  { Route, RouteHandler, Link } = Router;

let Backlog = React.createClass({
  displayName: 'Backlog',
  getInitialState() {
    return {
      pointsGoal: 0
    };
  },
  render() {
    return (
      <div className="backlog">
        <div className="row">
          <div className="add-story">
            <button
              className="btn btn-primary btn-large"
              data-toggle="modal"
              onClick={this._addNewStory}
              data-target="#add-story-dialogue">
              Add a Story
            </button>
          </div>
          <div className="points-goal">
            Goal for next sprint: <input type="number" value={this.state.pointsGoal} onChange={this._updateGoal} />
            points
          </div>
          <div className="create-taskboard">
            <Link to="import-backlog">
              CSV Import
            </Link>&nbsp;
            <button className="btn-success" onClick={this._createTaskboard}>Create Taskboard</button>
          </div>
        </div>
        <StoryList line={this.props.line} stories={this.props.stories} />
        <StoryEditor users={this.props.users} />
      </div>
    );
  },
  componentWillReceiveProps(newProps) {
    let pointsGoal = newProps.line.pointsGoal;
    if(pointsGoal) {
      this.setState({pointsGoal: pointsGoal});
    }
  },
  _addNewStory() {
    StoryActions.openEditor();
  },
  _updateGoal(e) {
    e.preventDefault();
    let newGoal = Number.parseInt(e.target.value);
    if(Number.isNaN(newGoal)) {
      newGoal = 0;
    }
    LineActions.updateGoal(newGoal);
    this.setState({pointsGoal: newGoal});
  },
  _createTaskboard(e) {
    e.preventDefault();
    // Work out which stories are above the line
    let storiesAboveLine = LineUtils.storiesAboveLine(this.props.stories, this.state.pointsGoal);
    // Add them all to a new taskboard
    TaskActions.createTaskboard(storiesAboveLine);
    // Remove them all from the backlog
    for(let key in storiesAboveLine) {
      StoryActions.deleteStory(key);
    }
  }
});

module.exports = Backlog;
