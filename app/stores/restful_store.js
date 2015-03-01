class RestfulStore {
  static get ref() { throw "RestfulStore.ref() must be overridden" };
  static getAll(callback) {
    this.ref.on('value', function (data) {
      callback(data.val());
    });
  }
  static create(params) {
    this.ref.push(params);
    return params;
  }
  static update(id, params) {
    this.ref.child(id).update(params);
    return params;
  }
  static delete(id) {
    this.ref.child(id).remove();
  }

}

module.exports = RestfulStore
