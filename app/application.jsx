require('es6-shim');
var React = require('react'),
  Router = require('react-router'),
  Firebase = require('firebase'),
  Backlog = require('./components/backlog'),
  Taskboard = require('./components/taskboard'),
  StoryStore = require('./stores/story_store'),
  LineStore = require('./stores/line_store'),
  UserStore = require('./stores/user_store'),
  TaskboardStore = require('./stores/taskboard_store'),
  Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Yasa</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="#/taskboard">Taskboard</a></li>
              <li><a href="#/backlog">Backlog</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <RouteHandler {...this.props} />
    </div>
  }
})

var routes = (<Route handler={App}>
    <Route name="backlog" handler={Backlog} />
    <Route name="taskboard" handler={Taskboard} />
    <DefaultRoute handler={Taskboard} />
  </Route>)

Router.run(routes, function (Handler) {
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
