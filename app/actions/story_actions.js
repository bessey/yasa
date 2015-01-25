var Dispatcher = require('../dispatcher'),
    StoryConstants = require('../constants/story_constants');


var StoryActions = {
  swapStory: function (id, afterId, priority, afterPriority) {
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_SWAP,
      id: id,
      afterId: afterId,
      priority: priority,
      afterPriority: afterPriority
    });
  },
  createStory: function (storyParams) {
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_CREATE,
      storyParams: storyParams      
    });
  }
};

module.exports = StoryActions;