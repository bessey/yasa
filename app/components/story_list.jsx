var React = require('react'),
  Story = require('./story'),
  update = require('react/lib/update');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      stories: this.props.stories
    };
  },
  moveStory: function (id, afterId) {
    var story = this.state.stories.filter(c => c.id === id)[0],
        afterStory = this.state.stories.filter(c => c.id === afterId)[0],
        storyIndex = this.state.stories.indexOf(story),
        afterIndex = this.state.stories.indexOf(afterStory);

    var stateUpdate = {
      stories: {
        $splice: [
          [storyIndex, 1],
          [afterIndex, 0, story]
        ]
      }
    };

    this.setState(update(this.state, stateUpdate));
  },
  render: function () {
    var stories = this.state.stories.map(story => {
      return (
        <Story
          key={story.id}
          id={story.id}
          story={story}
          moveStory={this.moveStory} />
      );
    }, this);
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