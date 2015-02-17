var React = require('react'),
  Router = require('react-router'),
  App = require('./components/app'),
  Backlog = require('./components/backlog'),
  UserManager = require('./components/user_manager'),
  Taskboard = require('./components/taskboard'),
  Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler;

var routes = (<Route handler={App}>
    <Route name="backlog" handler={Backlog} />
    <Route name="taskboard" handler={Taskboard} />
    <Route name="users" handler={UserManager} />
    <DefaultRoute handler={Taskboard} />
  </Route>);

module.exports = routes;
