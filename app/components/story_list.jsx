var React = require('react'),
  Story = require('./story'),
  update = require('react/lib/update');

module.exports = React.createClass({
  render: function () {
    var stories = [];
    this.props.stories.forEach(story => {
      var storyWithPriority = Object.assign(story.val(), {priority: story.getPriority()});
      stories.push(<Story
        key={story.key()}
        id={story.key()}
        story={storyWithPriority} />)
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