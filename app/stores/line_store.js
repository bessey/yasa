var Dispatcher    = require('../dispatcher'),
    LineConstants = require('../constants/line_constants'),
    Firebase      = require("firebase");

var firebase = new Firebase(`${global.config.fbBaseRef}/line`);

var LineStore = {
  getLine: function (callback) {
    return firebase.on('value', function (data) {
      callback(data.val() || {});
    });
  }
};

function updateGoal(newGoal) {
  firebase.update({pointsGoal: Number.parseInt(newGoal)});
}

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case LineConstants.UPDATE_GOAL:
      updateGoal(action.newGoal);
      break;
    default:
  }
});

module.exports = LineStore;
