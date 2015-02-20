var React = require('react'),
  Router  = require('react-router'),
  routes  = require('./routes'),
  Html    = require('./components/Html'),
  StoryStore = require('./stores/story_store'),
  LineStore = require('./stores/line_store'),
  UserStore = require('./stores/user_store'),
  TaskboardStore = require('./stores/taskboard_store');

let dependencies = {}

LineStore.getLine(function (line) {
  dependencies.line = line;
});
StoryStore.getSorted(function (stories) {
  dependencies.stories = stories;
});
TaskboardStore.getCurrentTaskboard(function (taskboard, id) {
  dependencies.taskboard = taskboard;
  dependencies.taskboardId = id;
});
UserStore.getAll(users => {
  dependencies.users = users;
});
UserStore.activateCache();

module.exports = function (req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {

    let dependencyClone = JSON.parse(JSON.stringify(dependencies))
    var markup = React.renderToString(<Handler {...dependencyClone} />);
    var html   = React.renderToStaticMarkup(<Html markup={markup} dependencies={dependencyClone} />);

    res.send('<!DOCTYPE html>' + html);
  });
};
