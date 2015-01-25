var Dispatcher = require('../dispatcher'), 
    { EventEmitter } = require('events'),
    StoryConstants = require('../constants/story_constants');

var CHANGE_EVENT = 'change';

var _stories = {
  1: {
    id: 1,
    sort: 100,
    tech: 'matt',
    manager: 'ben',
    epic: 'Bonerific',
    story: 'As a Trombone, I can toot my own horn',
    points: 3,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
  2: {
    id: 2,
    sort: 200,
    tech: 'pat',
    manager: 'tim',
    epic: 'Bonerific',
    story: 'As a Violin, I can toot my own horn',
    points: 5,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
  3: {
    id: 3,
    sort: 300,
    tech: 'steve',
    manager: 'anand',
    epic: 'Bonerific',
    story: 'As a Quail, I can toot my own horn',
    points: 3,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  }
};
var currentId = 4;

function storySwap(id, afterId) {
  var story = _stories[id],
      afterStory = _stories[afterId],
      storyIndex = story.sort,
      afterIndex = afterStory.sort;

  story.sort = afterIndex, afterStory.sort = storyIndex;
}

function storyCreate(params) {
  var story = Object.assign({id: currentId, sort: 1}, params);
  _stories[currentId] = story;
  currentId++;
  return story;
}

var StoryStore = Object.assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _stories;
  },
  getSorted: function() {
    var sortedStories = []
    // Build Array of stories from hash
    for(var key in _stories) {
      var story = _stories[key];
      sortedStories.push(story);
    };
    // Sort by the sort ID
    sortedStories = sortedStories.sort(function(a, b) {
      if(a.sort < b.sort) { return -1; }
      if(a.sort > b.sort) { return  1; }
      return 0;
    });
    return sortedStories;
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
    case StoryConstants.STORY_CREATE:
      storyCreate(action.storyParams);
      StoryStore.emitChange();
    default:
  }
});

module.exports = StoryStore;