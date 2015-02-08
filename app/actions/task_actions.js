var Dispatcher = require('../dispatcher'),
    TaskConstants = require('../constants/task_constants');


var TaskActions = {
  createTask: function (taskboardId, storyId, task) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASK_CREATE,
      taskboardId: taskboardId,
      storyId: storyId,
      task: task
    });
  },
  updateTask: function (taskboardId, storyId, id, task) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASK_UPDATE,
      taskboardId: taskboardId,
      storyId: storyId,
      id:     id,
      task:  task
    });
  }
};

module.exports = TaskActions;
