// Karma setup
global["jQuery"] = require('jquery');
global["assert"] = require("assert");

// Add new specs from this point onward
require('./hello_world_spec');

require('./stores/story_store_spec');
