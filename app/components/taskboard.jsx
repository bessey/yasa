var React = require('react'),
  TaskList = require('./taskboard/task_list'),
  UserLegend = require('./taskboard/user_legend'),
  StoryEditor = require('./story_editor');

var Taskboard = React.createClass({
  displayName: 'Taskboard',
  propTypes: {
    taskboard: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  },
  render() {
    var tasklists = [],
      taskboard = this.props.taskboard,
      users     = this.props.users;
    for(let key in taskboard) {
      tasklists.push(<TaskList taskboardId={this.props.taskboardId} key={key} storyId={key} story={taskboard[key]} users={users} />);
    }
    return (<div className='taskboard'>
      <div className="task-list header">
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
      <div className='contents'>
        {tasklists}
      </div>
      <StoryEditor users={this.props.users} />
      <UserLegend users={users} />
    </div>);
  }
});

module.exports = Taskboard;
