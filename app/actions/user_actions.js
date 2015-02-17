var Dispatcher = require('../dispatcher'),
    UserConstants = require('../constants/user_constants');


var UserActions = {
  createUser: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_CREATE,
      user: user
    });
  },
  deleteUser: function (id) {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_DELETE,
      id: id
    });
  },
  updateUser: function (id, user) {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_UPDATE,
      user: user,
      id:   id
    });
  }
};

module.exports = UserActions;
