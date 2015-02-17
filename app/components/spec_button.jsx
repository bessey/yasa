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
        className="open-spec-button">
          Spec
        </a>;
    } else {
      return <button className="open-spec-button" disabled="disabled">Spec</button>;
    }
  }
});
