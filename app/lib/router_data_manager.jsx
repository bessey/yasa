let LineStore      = require('../stores/line_store'),
    StoryStore     = require('../stores/story_store'),
    TaskboardStore = require('../stores/taskboard_store'),
    UserStore      = require('../stores/user_store'),
    Firebase       = require('firebase');

module.exports = class DataManager {
  static initialise () {
    let props = {
      line: {
        pointsGoal: 50,
      },
      stories: {},
      taskboard: {},
      users: {}
    };
    var ref = new Firebase(`${global.config.fbBaseRef}/`).set(props);
    return props;
  }
  static handleData (callback = { setProps: () => {} }) {
    let dataObject = {};
    LineStore.getLine(function (line) {
      dataObject.line = line;
      callback.setProps({line: line});
    });
    StoryStore.getSorted(function (stories) {
      dataObject.stories = stories;
      callback.setProps({stories: stories});
    });
    TaskboardStore.getCurrentTaskboard(function (taskboard, id) {
      dataObject.taskboard = taskboard;
      dataObject.taskboardId = id;
      if(id) {
        callback.setProps({taskboard: taskboard, taskboardId: id});
      }
    });
    UserStore.getAll((users) => {
      dataObject.users = users
      callback.setProps({users: users});
    });
    UserStore.activateCache();
    return dataObject;
  }
}
