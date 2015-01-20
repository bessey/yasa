var React = require('react');
var Backlog = require('./components/backlog');

window.stories = [
  {
    tech: 'matt',
    manager: 'ben',
    id: 123,
    epic: 'Bonerific',
    story: 'As a Trombone, I can toot my own horn',
    points: 3,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
  {
    tech: 'pat',
    manager: 'tim',
    id: 424,
    epic: 'Bonerific',
    story: 'As a Violin, I can toot my own horn',
    points: 5,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
  {
    tech: 'steve',
    manager: 'anand',
    id: 23,
    epic: 'Bonerific',
    story: 'As a Quail, I can toot my own horn',
    points: 3,
    spec: 'Here is a load more info on the bugger.\n\nKnow what I mean?'
  },
]

React.render(<Backlog />, document.getElementById('yasa-root'));