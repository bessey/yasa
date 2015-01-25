var React = require('react'),
  StoryList = require('./story_list'),
  StoryEditor = require('./story_editor'),
  StoryStore = require('../stores/story_store');

function getState() {
  return {
    stories: StoryStore.getSorted()
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    StoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StoryStore.removeChangeListener(this._onChange);
  },
  render: function () {
    return (
      <div className="backlog">
        <h1>Backlog</h1>
        <button className="btn btn-primary btn-large"  data-toggle="modal" data-target="#add-story-dialogue">Add a Story</button>
        <StoryList stories={this.state.stories} />
        <StoryEditor />
      </div>
    )
  },
  _onChange: function () {
    this.setState(getState());
  }
});