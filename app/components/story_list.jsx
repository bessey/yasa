module.exports = React.createClass({
  render: function () {
    var createStory = function (story) {
      return <tr className="story" key={story.id}>
        <td>
          { story.tech } 
        </td>
        <td>
          { story.manager } 
        </td>
        <td>
          { story.id } 
        </td>
        <td>
          { story.epic } 
        </td>
        <td>
          { story.story } 
        </td>
        <td>
          { story.points } 
        </td>
      </tr>
    };
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
        {this.props.stories.map(createStory)}
      </tbody>
    </table>;
  }
});