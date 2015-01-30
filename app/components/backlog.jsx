var React = require('react'),
  StoryList = require('./story_list'),
  StoryEditor = require('./story_editor'),
  StoryActions = require('../actions/story_actions');

var editingId, editingStory;

module.exports = React.createClass({
  addNewStory: function () {
    StoryActions.openEditor();
  },
  render: function () {
    return (
      <div className="backlog">
        <h1>Backlog</h1>
        <button
          className="btn btn-primary btn-large"
          data-toggle="modal"
          onClick={this.addNewStory}
          data-target="#add-story-dialogue">
          Add a Story
        </button>
        <StoryList line={this.props.line} stories={this.props.stories} />
        <StoryEditor />
      </div>
    );
  }
});
