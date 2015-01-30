var Dispatcher = require('../dispatcher'),
    LineConstants = require('../constants/line_constants');


var LineActions = {
  updateGoal: function (newGoal) {
    Dispatcher.dispatch({
      actionType: LineConstants.UPDATE_GOAL,
      newGoal: newGoal
    });
  }
};

module.exports = LineActions;