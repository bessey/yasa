var Dispatcher = require('../dispatcher'),
    TaskConstants = require('../constants/task_constants');


var TaskActions = {
  createTaskboard(tasks) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASKBOARD_CREATE,
      tasks: tasks
    });
  },
  createTask(taskboardId, storyId, task) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASK_CREATE,
      taskboardId: taskboardId,
      storyId: storyId,
      task: task
    });
  },
  updateTask(taskboardId, storyId, id, task) {
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
