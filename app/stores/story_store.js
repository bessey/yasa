var Dispatcher = require('../dispatcher'), 
    { EventEmitter } = require('events'),
    StoryConstants = require('../constants/story_constants'),
    Firebase = require("firebase");

var CHANGE_EVENT = 'change';
var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/stories/");

function storySwap(id, afterId, priority, afterPriority) {
  if(priority === afterPriority) {
    afterPriority += 0.0001;
  }
  firebase.child(id).setPriority(afterPriority);
  firebase.child(afterId).setPriority(priority);
}

function storyCreate(params) {
  var story = Object.assign({sort: 1, ".priority": 1}, params);
  firebase.push(story);
  return story;
}

var editingId = null;

var StoryStore = Object.assign({}, EventEmitter.prototype, {
  getSorted: function(callback) {
    firebase.on('value', callback);
  }
});

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case StoryConstants.STORY_SWAP:
      storySwap(action.id, action.afterId, action.priority, action.afterPriority);
      break;
    case StoryConstants.STORY_CREATE:
      storyCreate(action.storyParams);
      break;
    default:
  }
});

module.exports = StoryStore;