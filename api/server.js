"use strict"
let app = require('express')();
let config = require("../config/database");
let bodyParser = require('body-parser');
let server = require('http').Server(app);
require('thinky')({servers: [config]});

app.use(bodyParser.json());
app.use(require('./routes/stories'));

let teamsRoutes = require('./routes/teams');
app.use(teamsRoutes.express);
teamsRoutes.socket(server);

app.listen = function(port) {
  return server.listen(port);
}

module.exports = app;
