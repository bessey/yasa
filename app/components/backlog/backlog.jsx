let React = require('react');
let connectToStores = require('alt/utils/connectToStores');
let {RouteHandler, Link} = require('react-router');

let StoryStore = require('../../stores/story_store');
let StoryActions = require('../../actions/story_actions');

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
    return <div className="backlog">
        <div className="row">
          <h2>Backlog</h2>
          <RouteHandler {...this.props} />
        </div>
      </div>;
  }
}

module.exports = connectToStores(Backlog);
