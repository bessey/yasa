import React from 'react';
import {Link} from 'react-router';

class StoryList extends React.Component {
  render() {
    var stories = this.props.stories.map((story) => {
      return <div key={story.id}>
        {story.title}
      </div>;
    });
    return <div>
      <Link to='new_story'>Add Story</Link>
      {stories}
    </div>;
  }
}

export default StoryList;
