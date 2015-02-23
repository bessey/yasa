var React = require('react'),
  Story = require('./story'),
  BacklogLine = require('./backlog_line');

module.exports = React.createClass({
  displayName: 'StoryList',
  render: function () {
    var stories = this._buildStoryList();
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
  },
  _buildStoryList: function () {
    var stories = [], pointsAbove = 0, linePushed = false, pointsByTech = {};
    for(let key in this.props.stories) {
      var story = this.props.stories[key], pointsToAdd = Number(story.points);
      if(!linePushed) {
        if ((pointsAbove + pointsToAdd) > this.props.line.pointsGoal) {
          linePushed = true;
          stories.push(this._buildLine(pointsAbove, pointsByTech));
        } else {
          pointsAbove += pointsToAdd;
          this._incrementByTech(pointsByTech, story.techId, pointsToAdd);
        }
      }
      stories.push(<Story id={key} key={key} story={story} />);
    }
    if(!linePushed) {
      stories.push(this._buildLine(pointsAbove, pointsByTech));
    }
    return stories;
  },
  _buildLine: function (pointsAbove, pointsByTech) {
    return <BacklogLine
      key="theLine"
      pointsAbove={pointsAbove}
      pointsByTech={pointsByTech} />;
  },
  _incrementByTech: function (pointsByTech, tech, pointsToAdd) {
    var currentPoints = pointsByTech[tech] || 0;
    pointsByTech[tech] = currentPoints + pointsToAdd;
  }
});
