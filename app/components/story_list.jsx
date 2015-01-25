var React = require('react'),
  Story = require('./story'),
  update = require('react/lib/update');

module.exports = React.createClass({
  render: function () {
    var stories = this.props.stories.map(story => {
      return (<Story
        key={story.id}
        id={story.id}
        story={story} />)
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