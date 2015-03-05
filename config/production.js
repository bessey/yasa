let BaseEnvironment = require('./environment');

class Environment extends BaseEnvironment {
  static get environment() {
    return "production";
  }
}

global["config"] = Environment;
module.exports = Environment;
