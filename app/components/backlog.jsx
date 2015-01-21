var React = require('react');
var StoryList = require('./story_list');
var StoryStore = require('../stores/story_store');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      stories: StoryStore.getAll()
    };
  },
  render: function () {
    return (
      <div className="backlog">
        <h1>Backlog</h1>
        <StoryList stories={this.state.stories} />
      </div>
    )
  }
});