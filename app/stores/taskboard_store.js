var Dispatcher    = require('../dispatcher'),
    TaskConstants = require('../constants/task_constants'),
    TaskActions   = require('../actions/task_actions'),
    RestfulStore  = require('./restful_store'),
    Firebase      = require("firebase");

var ref = new Firebase(`${global.config.fbBaseRef}/taskboards/`);

class TaskboardStore extends RestfulStore {
  static get ref() {
    return ref;
  }
  static tasksRef(taskboardId, storyId) {
    return this.ref.child(`${taskboardId}/${storyId}/tasks/`);
  }
  static createTask(taskboardId, storyId, task) {
    this.tasksRef(taskboardId, storyId).push(task);
  }
  static updateTask(taskboardId, storyId, id, task) {
    this.tasksRef(taskboardId, storyId).child(id).update(task);
  }
  static deleteTask(taskboardId, storyId, id) {
    this.tasksRef(taskboardId, storyId).child(id).remove();
  }
  static getCurrentTaskboard(callback) {
    this.ref.orderByPriority().limitToLast(1).on('value', (data) => {
      let values = data.val()
      if(!values) {
        return callback({}, null);
      }
      let id = Object.keys(values)[0]
      let firstChild = data.val()[id];
      callback(firstChild, id);
    });
  }
};

Dispatcher.register(function (action) {
  switch(action.actionType) {
    case TaskConstants.TASKBOARD_CREATE:
      TaskboardStore.create(action.tasks);
      break;
    case TaskConstants.TASK_CREATE:
      TaskboardStore.createTask(action.taskboardId, action.storyId, action.task);
      break;
    case TaskConstants.TASK_UPDATE:
      TaskboardStore.updateTask(action.taskboardId, action.storyId, action.id, action.task);
      break;
    case TaskConstants.TASK_DELETE:
      TaskboardStore.deleteTask(action.taskboardId, action.storyId, action.id);
      break;
    default:
  }
});

module.exports = TaskboardStore;
