"use strict";
let express = require('express');
let Story = require('../models').Story;
let app = express();

app.route('/api/stories').post(function (req, res, next) {
  let story = new Story(req.body.story);
  story.save().then(function (result) {
    res.status(201);
    res.json({story: result});
  });
});

module.exports = app;
