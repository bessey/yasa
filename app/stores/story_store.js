var Dispatcher = require('../dispatcher'),
    StoryConstants = require('../constants/story_constants'),
    Firebase = require("firebase"),
    RestfulStore = require('./restful_store'),
    Config = require("../config");

// Initialise our sorting number to something huge (we work our way towards zero over time)
var highestPriority = 1e+15;
var ref = new Firebase(`${Config.fbBaseRef}/stories`)

class StoryStore extends RestfulStore {
  static get ref() {
    return ref;
  }

  static getSorted(callback) {
    this.ref.orderByPriority().on('value', (data) => {
      callback(data.val());
    });
  }
  static recalculateHighestPriority() {
    this.ref.orderByPriority().limitToFirst(1).on("value", (values) => {
      values.forEach((value) => {
        highestPriority = (value.getPriority() || highestPriority) - 1e+2;
      });
    })
  }
  static swap(id, afterId) {
    this.ref.once("value", (data) => {
      var priority = data.child(id).getPriority();
      var afterPriority = data.child(afterId).getPriority();
      if(priority === afterPriority) {
        afterPriority += 1;
      }
      this.ref.child(id).setPriority(afterPriority);
      this.ref.child(afterId).setPriority(priority);
    });
  }
  static create(params, assignPriority = true) {
    this._removeEmpty(params);
    if(assignPriority) {
      console.log("assigning priority");
      params = params[".priority"] = highestPriority;
    }
    return super.create(params);
  }
  static update(id, params) {
    this._removeEmpty(params);
    return super.update(id, params)
  }
  static _removeEmpty(params) {
    for(let key in params) {
      if(typeof(params[key]) === 'undefined') {
        delete params[key];
      }
    };
  }
};

StoryStore.recalculateHighestPriority();

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case StoryConstants.STORY_SWAP:
      StoryStore.swap(action.id, action.afterId);
      break;
    case StoryConstants.STORY_CREATE:
      StoryStore.create(action.storyParams);
      break;
    case StoryConstants.STORY_UPDATE:
      StoryStore.update(action.id, action.story);
      break;
    case StoryConstants.STORY_DELETE:
      StoryStore.delete(action.id);
      break;
    default:
  }
});

module.exports = StoryStore;
