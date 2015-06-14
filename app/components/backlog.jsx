let React = require('react');
let StoryStore = require('../stores/story_store');
let connectToStores = require('alt/utils/connectToStores');
let StoryActions = require('../actions/story_actions');

class Backlog extends React.Component {
  static getStores(props) {
    return [StoryStore];
  }
  static getPropsFromStores() {
    return StoryStore.getState();
  }

  componentDidMount () {
    StoryActions.fetchStories();
  }

  render() {
    var stories = this.props.stories.map((story) => {
      return <div key={story.id}>
        {story.title}
      </div>;
    });
    return <div className="backlog">
        <div className="row">
          <h2>Backlog</h2>
          {stories}
        </div>
      </div>;
  }
}

module.exports = connectToStores(Backlog);
