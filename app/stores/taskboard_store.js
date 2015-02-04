var Dispatcher = require('../dispatcher'),
    Firebase = require("firebase");

var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/taskboards/");

var TaskboardStore = {
  getCurrentTaskboard(callback) {
    firebase.orderByPriority().limitToFirst(1).on('value', (data) => {
      var firstChild = data.val()[Object.keys(data.val())];
      callback(firstChild);
    });
  }
};

module.exports = TaskboardStore;
