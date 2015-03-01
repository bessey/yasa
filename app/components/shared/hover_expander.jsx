let React     = require('react'),
    PropTypes = React.PropTypes;

module.exports = React.createClass({
  displayName: 'HoverExpander',
  propTypes: {
    text: PropTypes.string.isRequired
  },
  render() {
    return <div className="hover-expander hover-container">
      <div className="contents">
        { this.props.text }
      </div>
    </div>
  }
});
