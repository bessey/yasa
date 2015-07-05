import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {RouteHandler, Link} from 'react-router';

import StoryStore from '../../stores/story_store';
import StoryActions from '../../actions/story_actions';

class Backlog extends React.Component {
  static getStores(props) {
    return [StoryStore];
  }
  static getPropsFromStores() {
    return StoryStore.getState();
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

export default connectToStores(Backlog);
