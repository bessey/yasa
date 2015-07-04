import React from 'react';
import {RouteHandler, Link} from 'react-router';

export default class Body extends React.Component {
  render() {
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
            <Link to="/" className="navbar-brand">
              Yasa
            </Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link className="navbar-backlog" to="backlog">Backlog</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <RouteHandler {...this.props} />
    </div>;
  }
};
