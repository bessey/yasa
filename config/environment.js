module.exports = class BaseEnvironment {
  static get environment() {
    // Replaced at compile time with the actual environment
    return "test";
  }

  static get fbBaseRef() {
    return `${this.fbDomain}/${this.environment}`;
  }

  static get fbDomain() {
    return `https://fiery-torch-5025.firebaseio.com`;
  }
}
