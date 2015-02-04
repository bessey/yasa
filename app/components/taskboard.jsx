var React = require('react'),
  TaskList = require('./taskboard/task_list');

var taskboard = [
  {
    key: "fs7ru9123hg",
    epic: "Book",
    manager: "Tim",
    points: "10",
    priority: 999999999999507,
    spec: "http://www.reddit.com/r/pics/comments/2ts7x4/we_did_that_thing/",
    story: "As an engineer, I have a pretty taskboard",
    tech: "matt",
    tasks: [
      {
        key: "1353",
        description: "Build the sexy taskboard",
        points: "4",
        assignee: "matt",
        position: "pending"
      },
      {
        key: "424",
        description: "Build the sexy taskboard",
        points: "4",
        assignee: "matt",
        position: "in-progress"
      },
      {
        key: "8756",
        description: "Build the sexy taskboard",
        points: "4",
        assignee: "matt",
        position: "pending"
      },
    ]
  },
  {
    key: "g8d76gdfgh67",
    epic: "Book",
    manager: "Tim",
    points: "10",
    priority: 999999999999507,
    spec: "http://www.reddit.com/r/pics/comments/2ts7x4/we_did_that_thing/",
    story: "As an engineer, I have a pretty taskboard",
    tech: "matt",
    tasks: [
      {
        description: "Build the sexy taskboard",
        points: "4",
        assignee: "matt",
        position: "in-progress"
      }
    ]

  },
  {
    key: "23f534h534g",
    epic: "Book",
    manager: "Tim",
    points: "10",
    priority: 999999999999507,
    spec: "http://www.reddit.com/r/pics/comments/2ts7x4/we_did_that_thing/",
    story: "As an engineer, I have a pretty taskboard",
    tech: "matt",
    tasks: [
      {
        description: "Build the sexy taskboard",
        points: "4",
        assignee: "matt",
        position: "complete"
      }
    ]
  },
]

var Taskboard = React.createClass({
  displayName: 'Taskboard',
  render: function () {
    var tasklists = taskboard.map(story => <TaskList story={story} />);
    return (<div>
      <h1>Taskboard</h1>
      <div className="taskboard-section-title story">
        Story
      </div>
      <div className="taskboard-section-title pending">
        Pending
      </div>
      <div className="taskboard-section-title in-progress">
        In Progress
      </div>
      <div className="taskboard-section-title complete">
        Complete
      </div>
      {tasklists}
    </div>);
  }
});

module.exports = Taskboard;
