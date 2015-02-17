var React = require('react'),
  StoryActions = require('../actions/story_actions');

module.exports = React.createClass({
  displayName: 'SpecButton',
  propTypes: {
    id: React.PropTypes.string.isRequired,
    story: React.PropTypes.string,
  },
  render() {
    return <button
      className="btn btn-default btn-xs"
      onClick={this._openEditor}
      data-toggle="modal" data-target="#add-story-dialogue">
      Edit
    </button>
  },
  _openEditor() {
    StoryActions.openEditor(this.props.id, this.props.story);
  }
});
