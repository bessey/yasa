"use strict";
let express = require('express');
let Team = require('../models').Team;
let app = express();

function respond404 (req, res, next) {
  res.status(404);
  res.json({error: "not found"});
}

app.route('/api/teams/me').get(function (req, res, next) {
  Team.orderBy({index: 'createdAt'}).limit(1).run().then(function (result) {
    if(result[0] == null) {
      return respond404(req, res, next);
    }
    res.json(result[0]);
  });
});

module.exports = app;
