var alt = require('../alt');
var StoryActions = require('../actions/story_actions');

class StoryStore {
  constructor() {
    this.stories = [];
    this.bindListeners({
      handleCreateStory:    StoryActions.CREATE_STORY,
      handleUpdateStories:  StoryActions.UPDATE_STORIES,
      handleFetchStories:   StoryActions.FETCH_STORIES
    });
  }

  handleFetchStories() {
    this.stories = [];
  }

  handleUpdateStories(stories) {
    this.stories = stories;
  }

  handleCreateStory(story) {
    this.stories.push(story);
  }
}

module.exports = alt.createStore(StoryStore, 'StoryStore');
