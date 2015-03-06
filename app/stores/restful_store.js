class RestfulStore {
  static get ref() { throw "RestfulStore.ref() must be overridden" };
  static getAll(callback) {
    return this.ref.on('value', function (data) {
      try {
        let val = data.val() || {}
        callback(val);
      } catch(err) {
        let e = new Error(err)
        console.warn(e);
        console.warn(e.stack);
      }
    });
  }
  static create(params, callback) {
    this.ref.push(params, callback);
    return params;
  }
  static update(id, params, callback) {
    this.ref.child(id).update(params, callback);
    return params;
  }
  static delete(id, callback) {
    return this.ref.child(id).remove(callback);
  }

}

module.exports = RestfulStore
