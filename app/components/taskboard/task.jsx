var React = require('react');

var TaskList = React.createClass({
  displayName: 'Task',
  render() {
    var task = this.props.task;
    return <div key={task.key} className="task">
      {task.description} - {task.assignee}
    </div>
  }
});

module.exports = TaskList;
