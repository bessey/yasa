var Dispatcher = require('../dispatcher'),
    UserConstants = require('../constants/user_constants'),
    Firebase = require("firebase"),
    Config = require("../config");

var firebase = new Firebase(`${Config.fbBaseRef}/users`);

var usersCache = {};


function createUser(user) {
  firebase.push(user);
}

function updateUser(id, user) {
  firebase.child(id).update(user);
}

function deleteUser(id) {
  firebase.child(id).remove();
}

var UserStore = {
  getAll(callback) {
    firebase.on('value', (data) => {
      callback(data.val());
    });
  },
  findByName(name) {
    for(let key in usersCache) {
      if(usersCache[key].name === name) {
        return Object.assign(usersCache[key], {key: key});
      }
    }
    return null;
  },
  find(id) {
    return usersCache[id] || {name: 'Unknown'};
  },
  activateCache() {
    this.getAll((users) => usersCache = users)
  },
  // Useful for populating client's cache on page load
  warmCache(preloadedUsers) {
    usersCache = preloadedUsers;
  }
};

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case UserConstants.USER_CREATE:
      createUser(action.user);
      break;
    case UserConstants.USER_DELETE:
      deleteUser(action.id);
      break;
    case UserConstants.USER_UPDATE:
      updateUser(action.id, action.user);
      break;
    default:
  }
});

module.exports = UserStore;
