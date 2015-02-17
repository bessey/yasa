var React = require('react'),
  Task = require('./task'),
  UserStore = require('../../stores/user_store'),
  SpecButton = require('../spec_button');

var TaskList = React.createClass({
  displayName: 'TaskList',
  propTypes: {
    storyId: React.PropTypes.any.isRequired,
    taskboardId: React.PropTypes.any.isRequired
  },
  render() {
    var story = this.props.story, users = this.props.users;
    var pendingTasks = [], inProgressTasks = [], completeTasks = [];
    return (<div className="task-list">
      <div className={this._storyClasses(users, story)}>
        {story.story}
        <br/>
        {story.points}
        <br/>
        <SpecButton spec={story.spec} />
      </div>
      <div className="taskboard-sections">
        <div className="taskboard-section pending">
          {this._tasksForState("pending")}
          <Task
            users={this.props.users}
            taskboardId={this.props.taskboardId}
            storyId={this.props.storyId}
            key='new-task' />
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
      if(tasks[key].state !== state) { continue; }
      var task = tasks[key],
        userClass = this._userClass(task.assigneeId);
      tasksList.push(
        <Task
          users={this.props.users}
          taskboardId={this.props.taskboardId}
          storyId={this.props.storyId}
          key={key} id={key} task={task} userClass={userClass} />
      );
    }
    return tasksList;
  },
  _storyClasses(users, story) {
    return `taskboard-story ${this._userClass(story.techId)}`;
  },
  _userClass(id) {
    var user;
    if(user = UserStore.find(id)) {
      return user.color;
    } else {
      return "unknown";
    }
  }
});

module.exports = TaskList;
