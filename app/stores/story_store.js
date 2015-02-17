var Dispatcher = require('../dispatcher'),
    StoryConstants = require('../constants/story_constants'),
    Firebase = require("firebase"),
    Config = require("../config");

var firebase = new Firebase(`${Config.fbBaseRef}/stories`);
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

function removeEmpty(params) {
  for(let key in params) {
    if(typeof(params[key]) === 'undefined') {
      delete params[key];
    }
  };
}

function swapStory(id, afterId) {
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

function createStory(params) {
  removeEmpty(params);
  var story = Object.assign({".priority": highestPriority}, params);
  firebase.push(story);
  return story;
}

function updateStory(id, params) {
  removeEmpty(params);
  firebase.child(id).update(params);
  return params;
}

function deleteStory(id) {
  firebase.child(id).remove();
}

StoryStore.recalculateHighestPriority();

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case StoryConstants.STORY_SWAP:
      swapStory(action.id, action.afterId);
      break;
    case StoryConstants.STORY_CREATE:
      createStory(action.storyParams);
      break;
    case StoryConstants.STORY_UPDATE:
      updateStory(action.id, action.story);
      break;
    case StoryConstants.STORY_DELETE:
      deleteStory(action.id);
      break;
    default:
  }
});

module.exports = StoryStore;
