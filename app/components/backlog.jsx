var React = require('react');
var StoryList = require('./story_list');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      stories: window.stories
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