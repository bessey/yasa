"use strict";

let config = require("../config/database.js");
let r = require('rethinkdbdash')({servers: [config]});

r.tableCreate('backlogs').run().then(function (results) {
  console.log(results);
  console.log("Created Backlogs Table");
  return r.table('backlogs').insert({
    createdAt: "2015-06-14 18:18:00"
  }).run();
}).then(function (results) {
  console.log(results);
}).catch(function (error) {
  console.warn(error);
}).finally(function () {
  process.exit();
});
