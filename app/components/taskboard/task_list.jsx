var React = require('react'),
  Task = require('./task');

var TaskList = React.createClass({
  displayName: 'TaskList',
  render() {
    var story = this.props.story, users = this.props.users;
    var pendingTasks = [], inProgressTasks = [], completeTasks = [];
    return (<div className="task-list">
      <div className={this._storyClasses(users, story)}>
        {story.story}
      </div>
      <div className="taskboard-sections">
        <div className="taskboard-section pending">
          {this._tasksForState("pending")}
        </div>
        <div className="taskboard-section in-progress">
          {this._tasksForState("in-progress")}
        </div>
        <div className="taskboard-section complete">
          {this._tasksForState("complete")}
        </div>
      </div>
    </div>)
  },
  _tasksForState(state) {
    var tasksList = [], tasks = this.props.story.tasks;
    for(let key in tasks) {
      if(tasks[key].position !== state) { continue; }
      var task = tasks[key],
        userClass = this._userClass(this.props.users, task.assignee);
      tasksList.push(
        <Task task={task} userClass={userClass} />
      );
    }
    return tasksList;
  },
  _storyClasses(users, story) {
    return `taskboard-story ${this._userClass(users, story.tech)}`;
  },
  _userClass(users, id) {
    for(let key in users) {
      if(key === id) {
        return users[key].color;
      }
    }
    return "unknown";
  }
});

module.exports = TaskList;
