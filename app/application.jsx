require('es6-shim');
var React = require('react'),
  Backlog = require('./components/backlog'),
  Firebase = require('firebase'),
  StoryStore = require('./stores/story_store'),
  LineStore = require('./stores/line_store');

var line = {pointsGoal: 0};
var stories = {};
var backlog = React.render(<Backlog line={line} stories={stories} />, document.getElementById('yasa-root'));

LineStore.getLine(function (line) {
  backlog.setProps({line: line});
});

StoryStore.getSorted(function (stories) {
  backlog.setProps({stories: stories});
});
