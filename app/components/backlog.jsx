var React = require('react'),
  StoryList = require('./story_list'),
  StoryEditor = require('./story_editor'),
  StoryStore = require('../stores/story_store');

module.exports = React.createClass({
  getInitialState: function() {
    return {stories: []};
  },
  componentDidMount: function() {
    var _this = this;
    StoryStore.getSorted(function (value) {
      _this.replaceState({
        stories: value,
      });
    });
  },
  render: function () {
    return (
      <div className="backlog">
        <h1>Backlog</h1>
        <button className="btn btn-primary btn-large"  data-toggle="modal" data-target="#add-story-dialogue">Add a Story</button>
        <StoryList stories={this.state.stories} />
        <StoryEditor />
      </div>
    );
  }
});