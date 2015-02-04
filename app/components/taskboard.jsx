var React = require('react'),
  TaskList = require('./taskboard/task_list');

var Taskboard = React.createClass({
  displayName: 'Taskboard',
  render: function () {
    var tasklists = [], taskboard = this.props.taskboard;
    for(let key in taskboard) {
      tasklists.push(<TaskList story={taskboard[key]} />);
    }
    return (<div>
      <h1>Taskboard</h1>
      <div className="task-list">
        <div className="taskboard-story-title story">
          Story
        </div>
        <div className="taskboard-sections">
          <div className="taskboard-section-title pending">
            Pending
          </div>
          <div className="taskboard-section-title in-progress">
            In Progress
          </div>
          <div className="taskboard-section-title complete">
            Complete
          </div>
        </div>
      </div>
      {tasklists}
    </div>);
  }
});

module.exports = Taskboard;
