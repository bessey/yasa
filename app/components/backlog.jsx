var React = require('react');
var StoryList = require('./story_list');
var StoryStore = require('../stores/story_store');

function getState() {
  return {
    stories: StoryStore.getAll()
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
        <StoryList stories={this.state.stories} />
      </div>
    )
  },
  _onChange: function () {
    this.setState(getState());
  }
});