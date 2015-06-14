let alt = require('../alt');
let TeamFetcher = require('../utils/team_fetcher');

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

module.exports = alt.createActions(StoryActions);
