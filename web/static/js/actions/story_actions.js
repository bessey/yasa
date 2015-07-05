import alt from '../alt';
import TeamFetcher from '../utils/team_fetcher';

class StoryActions {
  updateStories(stories) {
    this.dispatch(stories);
  }
  createStory(story) {
    this.dispatch(story);
  }
}

export default alt.createActions(StoryActions);
