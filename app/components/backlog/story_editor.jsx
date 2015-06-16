let React = require('react');
let {Link} = require('react-router');

class StoryEditor extends React.Component {
  render() {
    return <div>
      <Link to='stories'>Back to Stories</Link>
    </div>;
  }
}

module.exports = StoryEditor;
