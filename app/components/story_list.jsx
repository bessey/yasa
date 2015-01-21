var React = require('react'),
  Story = require('./story'),
  StoryActions = require('../actions/story_actions'),
  update = require('react/lib/update');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      stories: this.props.stories
    };
  },
  moveStory: function (id, afterId) {
    StoryActions.swapStory(id, afterId);
  },
  render: function () {
    var stories = [];
    // Build Array of stories from hash
    for(var key in this.state.stories) {
      var story = this.state.stories[key];
      stories.push(story);
    };
    // Sort by the sort ID
    stories = stories.sort(function(a, b) {
      if(a.sort < b.sort) return -1;
      if(a.sort > b.sort) return  1;
      return 0;
    });
    // Create JSX from sorted Array
    stories = stories.map(story => {
      return (<Story
        key={story.id}
        id={story.id}
        story={story}
        moveStory={this.moveStory} />)
    });
    return <table className="table table-striped">
      <thead>
        <tr>
          <th>
            Tech
          </th>
          <th>
            PM
          </th>
          <th>
            ID
          </th>
          <th>
            Epic
          </th>
          <th>
            Story
          </th>
          <th>
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {stories}
      </tbody>
    </table>;
  }
});