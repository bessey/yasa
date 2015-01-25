var Dispatcher = require('../dispatcher'),
    StoryConstants = require('../constants/story_constants');


var StoryActions = {
  swapStory: function (id, afterId) {
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_SWAP,
      id: id,
      afterId: afterId
    });
  },
  createStory: function (storyParams) {
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_CREATE,
      storyParams: storyParams      
    });
  },
  updateStory: function (id, story) {
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_UPDATE,
      id:     id,
      story:  story
    });
  },
  openEditor: function (id, story) {
    Dispatcher.dispatch({
      actionType: StoryConstants.OPEN_EDITOR,
      id: id,
      story: (story || {})
    });
  },
  closeEditor: function () {
    Dispatcher.dispatch({
      actionType: StoryConstants.CLOSE_EDITOR,
    });
  }
};

module.exports = StoryActions;