var React = require('react'),
  Task = require('./task');

var TaskList = React.createClass({
  displayName: 'TaskList',
  render() {
    var story = this.props.story;
    var pendingTasks = [], inProgressTasks = [], completeTasks = [];
    return (<div className="task-list">
      <div className="taskboard-story">
        {story.story}
      </div>
      <div className="taskboard-section pending">
        {this._pendingTasks()}
      </div>
      <div className="taskboard-section in-progress">
        {this._inProgressTasks()}
      </div>
      <div className="taskboard-section complete">
        {this._completeTasks()}
      </div>
    </div>)
  },
  _pendingTasks() {
    return this.props.story.tasks
      .filter(task => task.position === "pending")
      .map(task => <Task task={task} />);
  },
  _inProgressTasks() {
    return this.props.story.tasks
      .filter(task => task.position === "in-progress")
      .map(task => <Task task={task} />);
  },
  _completeTasks() {
    return this.props.story.tasks
      .filter(task => task.position === "complete")
      .map(task => <Task task={task} />);
  }
});

module.exports = TaskList;
