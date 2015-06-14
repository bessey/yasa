"use strict";
let express = require('express');
let Team = require('../models').Team;
let app = express();

function respond404 (req, res, next) {
  res.status(404);
  res.json({error: "not found"});
}

app.route('/api/teams/me').get(function (req, res, next) {
  Team.orderBy({index: 'createdAt'}).limit(1).getJoin({stories: true, users: true}).then(function (result) {
    if(result[0] == null) {
      return respond404(req, res, next);
    }
    res.json(result[0]);
  });
});

function socket(server) {
  let io = require('socket.io')(server);

  io.on('connection', function (socket) {
    Team.orderBy({index: 'createdAt'}).limit(1).changes().then(function (feed){
      feed.each(function(error, doc) {
        let response;
        if (doc.isSaved() === false) {
          response = {
            event: 'delete',
            document: doc
          }
        } else if (doc.getOldValue() == null) {
          response = {
            event: 'insert',
            document: doc
          }
        } else {
          response = {
            event: 'update',
            document: doc
          }
        }
        socket.emit('team', response);
      })
    })
  });
}

module.exports = {
  express: app,
  socket: socket
};
