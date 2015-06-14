let React = require('react');
let ReactRouter = require('react-router');
let {RouteHandler} = ReactRouter;

module.exports = class Body extends React.Component {
  render() {
    return <div>
      <h1>Yasa</h1>
      <RouteHandler />
    </div>;
  }
};
