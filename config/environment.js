class Config {
  static get environment() {
    // Replaced at compile time with the actual environment
    return "YASA_ENVIRONMENT";
  }

  static get fbBaseRef() {
    return `https://fiery-torch-5025.firebaseio.com/${this.environment}`;
  }
}

module.exports = Config;
