var Dispatcher = require('../dispatcher'),
    Firebase = require("firebase"),
    UserConstants = require('../constants/user_constants');

var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/users/");

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
    return usersCache[id];
  }
};

UserStore.getAll((users) => usersCache = users);

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
