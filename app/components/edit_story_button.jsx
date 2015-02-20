var React = require('react'),
  StoryActions = require('../actions/story_actions');

module.exports = React.createClass({
  displayName: 'EditStoryButton',
  propTypes: {
    id: React.PropTypes.string.isRequired,
    story: React.PropTypes.object,
  },
  render() {
    return <button
      className="edit-story-button"
      onClick={this._openEditor}
      data-toggle="modal" data-target="#add-story-dialogue">
      Edit
    </button>
  },
  _openEditor() {
    StoryActions.openEditor(this.props.id, this.props.story);
  }
});
