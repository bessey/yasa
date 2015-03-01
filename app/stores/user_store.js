var Dispatcher = require('../dispatcher'),
    UserConstants = require('../constants/user_constants'),
    Firebase = require("firebase"),
    RestfulStore = require('./restful_store'),
    Config = require("../config");

var ref = new Firebase(`${Config.fbBaseRef}/users`);
var usersCache = {};

class UserStore extends RestfulStore {
  static get ref() {
    return ref;
  }
  static findByName(name) {
    for(let key in usersCache) {
      if(usersCache[key].name === name) {
        return Object.assign(usersCache[key], {key: key});
      }
    }
    return null;
  }
  static find(id) {
    return usersCache[id] || {};
  }
  static activateCache() {
    this.getAll((users) => usersCache = users)
  }
  // Useful for populating client's cache on page load
  static warmCache(preloadedUsers) {
    usersCache = preloadedUsers;
  }
};

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case UserConstants.USER_CREATE:
      UserStore.create(action.user);
      break;
    case UserConstants.USER_DELETE:
      UserStore.delete(action.id);
      break;
    case UserConstants.USER_UPDATE:
      UserStore.update(action.id, action.user);
      break;
    default:
  }
});

module.exports = UserStore;
