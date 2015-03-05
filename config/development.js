let BaseEnvironment = require('./environment');

class Environment extends BaseEnvironment {
  static get environment() {
    return "development";
  }
}

global["config"] = Environment;
module.exports = Environment;
