let BaseEnvironment = require('./environment');

class Environment extends BaseEnvironment {
  static get environment() {
    return "test";
  }
}

global["config"] = Environment;
