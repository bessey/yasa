var Dispatcher = require('../dispatcher'),
    StoryConstants = require('../constants/story_constants');


var StoryActions = {
  swapStory: function (id, afterId) {
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_SWAP,
      id: id,
      afterId: afterId
    });
  }
};

module.exports = StoryActions;