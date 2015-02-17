var React = require('react');

module.exports = React.createClass({
  displayName: 'SpecButton',
  propTypes: {
    spec: React.PropTypes.string
  },
  render: function () {
    var spec = this.props.spec
    if(spec) {
      return <a target="_blank"
        href={ spec }
        className="btn btn-primary btn-xs">
          Spec
        </a>;
    } else {
      return <button disabled="disabled" className="btn btn-primary btn-xs">Spec</button>;
    }
  }
});
