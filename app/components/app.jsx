var React = require('react'),
  { RouteHandler, Link } = require('react-router');

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
            <Link to="taskboard" className="navbar-brand">
              Yasa
            </Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="taskboard">Taskboard</Link>
              </li>
              <li>
                <Link to="backlog">Backlog</Link>
              </li>
              <li>
                <Link to="users">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <RouteHandler {...this.props} />
    </div>
  }
})

module.exports = App;
