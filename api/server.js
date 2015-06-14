"use strict"
let express = require('express');
let config = require("../config/database");
require('thinky')({servers: [config]});

let app = express();

app.use(require('./routes/teams'));

module.exports = app;
