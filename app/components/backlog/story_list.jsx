var React       = require('react'),
  Story         = require('./story'),
  BacklogLine   = require('./line'),
  LazyRender    = require('react-lazy-render');

module.exports = React.createClass({
  displayName: 'StoryList',
  render: function () {
    var stories = this._buildStoryList();
    return <div className="story-list">
      <div className="story-row header">
        <div className="number">
          #
        </div>
        <div className="tech">
          Tech
        </div>
        <div className="manager">
          PM
        </div>
        <div className="epic">
          Epic
        </div>
        <div className="story">
          Story
        </div>
        <div className="points">
          Points
        </div>
        <div className="actions">
        </div>
      </div>
      <LazyRender className="lazy-renderer" style={{minHeight: window.innerHeight - 200}} maxHeight={window.innerHeight - 200} itemPadding={5}>
        {stories}
      </LazyRender>
    </div>;
  },
  _buildStoryList: function () {
    let stories       = [],
        pointsAbove   = 0,
        linePushed    = false,
        pointsByTech  = {},
        rowCount      = 1;
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
      stories.push(<Story id={key} key={key} story={story} number={rowCount} />);
      rowCount++;
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
