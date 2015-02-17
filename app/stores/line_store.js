var Dispatcher = require('../dispatcher'),
    LineConstants = require('../constants/line_constants'),
    Firebase = require("firebase"),
    Config = require("../config");

var firebase = new Firebase(`${Config.fbBaseRef}/line`);

var LineStore = {
  getLine: function (callback) {
    firebase.on('value', function (data) {
      callback(data.val());
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
