var Dispatcher = require('../dispatcher'),
    Firebase = require("firebase");

var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/users/");

var UserStore = {
  getAll(callback) {
    firebase.on('value', (data) => {
      callback(data.val());
    });
  }
};

module.exports = UserStore;
