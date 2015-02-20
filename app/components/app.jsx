var React = require('react'),
  { RouteHandler } = require('react-router');

var App = React.createClass({
  render: function () {
    return <div className="container-fluid main-app">
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
              <li><a href="#/users">Users</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <RouteHandler {...this.props} />
    </div>
  }
})

module.exports = App;
