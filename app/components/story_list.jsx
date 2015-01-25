var React = require('react'),
  Story = require('./story'),
  update = require('react/lib/update');

module.exports = React.createClass({
  render: function () {
    var stories = [];
    var linePosition = 1, currentPosition = 0, pointsAbove = 0;
    this.props.stories.forEach((story, i) => {
      if(linePosition === currentPosition) {
        stories.push(<tr key="theLine">
            <td colSpan="6" className="the-line">
              The Line ({pointsAbove} points)
            </td>
          </tr>)
      }
      currentPosition++;
      var storyWithPriority = Object.assign(story.val(), {priority: story.getPriority()});
      pointsAbove += Number(storyWithPriority.points);
      stories.push(<Story
        key={story.key()}
        id={story.key()}
        story={storyWithPriority} />)
    });
    return <table className="table">
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
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        {stories}
      </tbody>
    </table>;
  }
});