var Dispatcher = require('../dispatcher'), 
    { EventEmitter } = require('events'),
    StoryConstants = require('../constants/story_constants');

var CHANGE_EVENT = 'change';

var _stories = {
  123: {
    id: 123,
    sort: 100,
    tech: 'matt',
    manager: 'ben',
    epic: 'Bonerific',
    story: 'As a Trombone, I can toot my own horn',
    points: 3,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
  424: {
    id: 424,
    sort: 200,
    tech: 'pat',
    manager: 'tim',
    epic: 'Bonerific',
    story: 'As a Violin, I can toot my own horn',
    points: 5,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
  23: {
    id: 23,
    sort: 300,
    tech: 'steve',
    manager: 'anand',
    epic: 'Bonerific',
    story: 'As a Quail, I can toot my own horn',
    points: 3,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  }
}

function storySwap(id, afterId) {
  var story = _stories[id],
      afterStory = _stories[afterId],
      storyIndex = story.sort,
      afterIndex = afterStory.sorted;

  story.sort = afterIndex, afterStory.sort = storyIndex;
}

var StoryStore = Object.assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _stories;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case StoryConstants.STORY_SWAP:
      storySwap(action.id, action.afterId);
      StoryStore.emitChange();
      break;
    default:
  }
});

module.exports = StoryStore;