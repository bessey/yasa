import alt from 'alt';
import TeamFetcher from 'utils/team_fetcher';

class StoryActions {
  updateStories(stories) {
    this.dispatch(stories);
  }
  createStory(story) {
    this.dispatch(story);
  }
  fetchStories() {
    this.dispatch();

    TeamFetcher.fetch().then((team) => {
      this.actions.updateStories(team.stories);
    });
  }
}

export default alt.createActions(StoryActions);
