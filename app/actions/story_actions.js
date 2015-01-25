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
  openEditor: function (editMode) {
    Dispatcher.dispatch({
      actionType: StoryConstants.OPEN_EDITOR,
      editMode: editMode
    });
  },
  closeEditor: function () {
    Dispatcher.dispatch({
      actionType: StoryConstants.CLOSE_EDITOR,
    });
  }
};

module.exports = StoryActions;