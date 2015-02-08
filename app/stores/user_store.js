var Dispatcher = require('../dispatcher'),
    Firebase = require("firebase");

var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/users/");

var usersCache = {};

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

module.exports = UserStore;
