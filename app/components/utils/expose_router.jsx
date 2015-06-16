let React = require('react');

let ExposeRouter = (ComponentClass) => {
  return React.createClass({
    displayName: 'ExposeRouter',

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },

    render() {
      return <ComponentClass {...this.props} router={this.context.router}/>;
    }
  });
}

module.exports = ExposeRouter;
