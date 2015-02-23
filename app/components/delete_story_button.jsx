var React = require('react'),
  StoryActions = require('../actions/story_actions');

module.exports = React.createClass({
  displayName: 'DeleteStoryButton',
  propTypes: {
    id: React.PropTypes.string.isRequired,
  },
  render() {
    return <button
      className="delete-story-button"
      onClick={this._deleteStory}>
      Delete
    </button>
  },
  _deleteStory() {
    StoryActions.deleteStory(this.props.id);
  }
});
