let config = require('../config');

module.exports = class TeamFetcher {
  static fetch() {
    return $.get(`${config.apiUrl}/teams/me`);
  }
}
