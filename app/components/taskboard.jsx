var React = require('react'),
  TaskList = require('./taskboard/task_list');

var Taskboard = React.createClass({
  displayName: 'Taskboard',
  render: function () {
    var tasklists = [],
      taskboard = this.props.taskboard,
      users     = this.props.users;
    for(let key in taskboard) {
      tasklists.push(<TaskList key={key} story={taskboard[key]} users={users} />);
    }
    return (<div className='taskboard'>
      <h1>Taskboard</h1>
      <div className="task-list">
        <div className="taskboard-story-title">
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
