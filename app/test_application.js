// Karma setup
require('es6-shim');
global["jQuery"] = require('jquery');

// Add new specs from this point onward
require('./spec/hello_world_spec');
