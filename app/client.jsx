require('es6-shim');
var React = require('react'),
  Router = require('react-router'),
  Firebase = require('firebase'),
  Routes = require('./routes'),
  StoryStore = require('./stores/story_store'),
  LineStore = require('./stores/line_store'),
  UserStore = require('./stores/user_store'),
  TaskboardStore = require('./stores/taskboard_store');

document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(Routes, function (Handler) {
    var line = {pointsGoal: 0}, stories = {}, taskboard = {}, users = {};
    var handler = React.render(<Handler line={line} stories={stories} taskboard={taskboard} users={users} />, document.getElementById('yasa-root'));
    LineStore.getLine(function (line) {
      handler.setProps({line: line});
    });
    StoryStore.getSorted(function (stories) {
      handler.setProps({stories: stories});
    });
    TaskboardStore.getCurrentTaskboard(function (taskboard, id) {
      handler.setProps({taskboard: taskboard, taskboardId: id});
    });
    UserStore.getAll(users => handler.setProps({users: users}));
  });
});
