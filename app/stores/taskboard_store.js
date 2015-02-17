var Dispatcher = require('../dispatcher'),
    Firebase = require("firebase"),
    TaskConstants = require('../constants/task_constants'),
    TaskActions = require('../actions/task_actions');

var firebase = new Firebase("https://fiery-torch-5025.firebaseio.com/taskboards/");

function createTaskboard(tasks) {
  firebase.push(tasks);
}

function createTask(taskboardId, storyId, task) {
  var tasksRef = firebase.child(`${taskboardId}/${storyId}/tasks/`);
  tasksRef.push(task);
}

function updateTask(taskboardId, storyId, id, task) {
  var tasksRef = firebase.child(`${taskboardId}/${storyId}/tasks/`);
  tasksRef.child(id).update(task);
}

var TaskboardStore = {
  getCurrentTaskboard(callback) {
    firebase.orderByPriority().limitToLast(1).on('value', (data) => {
      var id = Object.keys(data.val())[0]
      var firstChild = data.val()[id];
      callback(firstChild, id);
    });
  }
};

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case TaskConstants.TASKBOARD_CREATE:
      createTaskboard(action.tasks);
      break;
    case TaskConstants.TASK_CREATE:
      createTask(action.taskboardId, action.storyId, action.task);
      break;
    case TaskConstants.TASK_UPDATE:
      updateTask(action.taskboardId, action.storyId, action.id, action.task);
      break;
    default:
  }
});

module.exports = TaskboardStore;
