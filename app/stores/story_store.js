var Dispatcher = require('../dispatcher'),
    StoryConstants = require('../constants/story_constants'),
    Firebase = require("firebase");

var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/stories/");
// Initialise our sorting number to something huge (we work our way towards zero over time)
var highestPriority = 1e+15;

var StoryStore = {
  getSorted: function(callback) {
    firebase.orderByPriority().on('value', function (data) {
      callback(data.val());
    });
  },
  recalculateHighestPriority: function() {
    firebase.orderByPriority().limitToFirst(1).on("value", function (values) {
      values.forEach(function (value) {
        highestPriority = (value.getPriority() || highestPriority) - 1e+2;
      });
    })
  }
};

function storySwap(id, afterId) {
  firebase.once("value", function (data) {
    var priority = data.child(id).getPriority();
    var afterPriority = data.child(afterId).getPriority();
    if(priority === afterPriority) {
      afterPriority += 1;
    }
    firebase.child(id).setPriority(afterPriority);
    firebase.child(afterId).setPriority(priority);
  });
}

function storyCreate(params) {
  var story = Object.assign({".priority": highestPriority}, params);
  firebase.push(story);
  return story;
}

function storyUpdate(id, params) {
  firebase.child(id).update(params);
  return params;
}

StoryStore.recalculateHighestPriority();

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case StoryConstants.STORY_SWAP:
      storySwap(action.id, action.afterId);
      break;
    case StoryConstants.STORY_CREATE:
      storyCreate(action.storyParams);
      break;
    case StoryConstants.STORY_UPDATE:
      storyUpdate(action.id, action.story);
      break;
    default:
  }
});

module.exports = StoryStore;