"use strict"
let express = require('express');
let config = require("../config/database.js");
let r = require('rethinkdbdash')({servers: [config]});

let app = express();

function get(req, res, next) {
  r.table('backlogs').get(req.params.id).run().then(function (result) {
    res.json(result);
  }, function (error) {
    res.json({error: "not found"});
  });
}

app.route('/api/backlogs/:id').get(get);

module.exports = app;
