var React = require('react'),
  Story = require('./story'),
  BacklogLine = require('./backlog_line'),
  Firebase = require('firebase');

var lineRef = new Firebase("https://fiery-torch-5025.firebaseio.com/line/");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      line: {
        pointsGoal: 0
      }
    };
  },
  componentDidMount: function () {
    var _this = this;
    lineRef.on('value', function (data) {
      _this.setState({line: data.val()});
    });
  },
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
    this.props.stories.forEach((story, i) => {
      var storyWithPriority = Object.assign(story.val(), {priority: story.getPriority()});
      if(!linePushed && pointsAbove >= this.state.line.pointsGoal) {
        linePushed = true;
        this._pushLine(stories, pointsAbove, pointsByTech);
      } else {
        pointsAbove += Number(storyWithPriority.points);
        this._incrementByTech(pointsByTech, storyWithPriority);
      }
      stories.push(<Story
        key={story.key()}
        id={story.key()}
        story={storyWithPriority}
        />)
    });
    if(!linePushed) {
      this._pushLine(stories, pointsAbove, pointsByTech);
    }
    return stories;
  },
  _pushLine: function (stories, pointsAbove, pointsByTech) {
    stories.push(<BacklogLine 
      key="theLine"
      pointsGoal={this.state.line.pointsGoal}
      pointsAbove={pointsAbove}
      pointsByTech={pointsByTech}
      updateGoal={this._updateGoal} />);
  },
  _incrementByTech: function (pointsByTech, story) {
    var tech = story.tech;
    var currentPoints = pointsByTech[tech] || 0;
    pointsByTech[tech] = currentPoints + Number(story.points);
  },
  _updateGoal: function (newGoal) {
    lineRef.update({
      pointsGoal: newGoal
    });
  }
});