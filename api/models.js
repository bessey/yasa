"use strict";

let config = require("../config/database.js");
let thinky = require('thinky')(config);
let type = thinky.type, r = thinky.r;
let M = {};

M.Story = thinky.createModel("Story", {
  id: type.string()
});

M.Team = thinky.createModel("Team", {
  id:         type.string(),
  createdAt:  type.date().default(r.now()),
  lineGoal:   type.number()
});

M.Team.hasMany(M.Story, "stories", "id", "storyId");
M.Story.belongsTo(M.Team, "team", "teamId", "id");

module.exports = M;
