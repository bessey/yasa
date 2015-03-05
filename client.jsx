require('./config/YASA_ENVIRONMENT');

var React        = require('react'),
  Router         = require('react-router'),
  Firebase       = require('firebase'),
  Routes         = require('./app/routes'),
  StoryStore     = require('./app/stores/story_store'),
  LineStore      = require('./app/stores/line_store'),
  UserStore      = require('./app/stores/user_store'),
  TaskboardStore = require('./app/stores/taskboard_store');

require('bootstrap');

document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    let props = window.DATA;

    UserStore.warmCache(props.users);

    let handler = React.render(<Handler {...props} />, document.body);

    LineStore.getLine(function (line) {
      handler.setProps({line: line});
    });
    StoryStore.getSorted(function (stories) {
      handler.setProps({stories: stories});
    });
    TaskboardStore.getCurrentTaskboard(function (taskboard, id) {
      handler.setProps({taskboard: taskboard, taskboardId: id});
    });
    UserStore.getAll((users) => {
      handler.setProps({users: users});
    });
    UserStore.activateCache();
  });
});
