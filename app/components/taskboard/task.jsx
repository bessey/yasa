var React = require('react');

var TaskList = React.createClass({
  displayName: 'Task',
  render() {
    var task = this.props.task, userClass = this.props.userClass;
    return <div key={task.key} className={`task ${userClass}`}>
      {task.description} - {task.assignee}
    </div>
  }
});

module.exports = TaskList;
