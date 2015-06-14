"use strict";

let config = require("../config/database.js");
let r = require('rethinkdbdash')({servers: [config]});

let Models;

r.dbList().run().then(function (dbs) {
  let dbExists = dbs.indexOf(config.db) != -1;
  if(dbExists) {
    return r.dbDrop(config.db).run().then(function() {
      console.log("Destroyed existing DB")
      return r.dbCreate(config.db).run();
    })
  } else {
    return r.dbCreate(config.db).run();
  }
}).then(function () {
  console.log("Created new DB")
  Models = require('../api/models');
  console.log("Created all tables");
  Models.Team.insert({
    createdAt: new Date()
  }).run();
  return Models.Team.indexCreate('createdAt').run();
}).catch(function (error) {
  console.warn(error);
}).finally(function () {
  process.exit();
});
