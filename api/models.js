"use strict";

let config = require("../config/database.js");
let thinky = require('thinky')(config);
let type = thinky.type, r = thinky.r;
let M = {};

M.Team = thinky.createModel("Team", {
  id:         type.string(),
  createdAt:  type.date().default(r.now()),
  lineGoal:   type.number()
});

M.Story = thinky.createModel("Story", {
  id:           type.string(),
  title:        type.string(),
  description:  type.string(),
  userId:       type.string()
});

M.User = thinky.createModel("User", {
  id:           type.string(),
  teamId:       type.string(),
  username:     type.string(),
  colorPrimary: type.string(),
  colorSecondary: type.string()
});

M.Team.hasMany(M.Story, "stories", "id", "teamId");
M.Story.belongsTo(M.Team, "team", "teamId", "id");

M.User.hasMany(M.Story, "stories", "id", "userId");
M.Story.belongsTo(M.User, "user", "userId", "id");

M.Team.hasMany(M.User, "users", "id", "teamId");
M.User.belongsTo(M.Team, "team", "teamId", "id");

module.exports = M;
