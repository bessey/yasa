var React = require('react');
var Story = require('./story');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: {items: this.props.stories}
    };
  },
  sort: function(stories, dragging) {
    var data = this.state.data;
    data.items = stories;
    data.dragging = dragging;
    this.setState({data: data});
  },
  render: function () {
    var stories = this.state.data.items.map(function (story, i) {
      return (
        <Story
          sort={this.sort}
          data={this.state.data}
          key={i}
          story={story} />
      );
    }, this);
    return <div><table className="table table-striped">
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
    </table>
    <div>
      {stories}
    </div></div>;
  }
});