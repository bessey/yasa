var React = require('react'),
  StoryList = require('./story_list'),
  StoryEditor = require('./story_editor'),
  StoryStore = require('../stores/story_store'),
  StoryConstants = require('../constants/story_constants'),
  Dispatcher = require('../dispatcher');

var editingId, editingStory;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      stories: [],
      editingId: null,
      editingStory: {}
    };
  },
  componentDidMount: function() {
    var _this = this;
    StoryStore.getSorted(function (value) {
      _this.setState({
        stories: value,
      });
    });
    var updateEditing = this.updateEditing;
    Dispatcher.register(function (action) {
      switch(action.actionType) {
        case StoryConstants.OPEN_EDITOR:
          updateEditing(action.id, action.story);
          break;
        case StoryConstants.CLOSE_EDITOR:
          break;
        default:
      }
    });
  },
  updateEditing: function (editingId, editingStory) {
    this.setState({editingId: editingId, editingStory: editingStory});
  },
  addNewStory: function () {
    this.updateEditing(null, {});
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
        <StoryList stories={this.state.stories} />
        <StoryEditor id={this.state.editingId} story={this.state.editingStory} />
      </div>
    );
  }
});
