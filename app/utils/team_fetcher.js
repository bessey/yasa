let config = require('../config');
let io = require('socket.io-client');

module.exports = class TeamFetcher {
  static fetch() {
    return $.get(`${config.apiUrl}/teams/me`);
  }

  static subscribe() {
    let socket = io.connect(`${config.socketUrl}`);
    socket.on('team', (data) => {
      console.log(data);
    });
    return socket;
  }
};
