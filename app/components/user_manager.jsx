var React = require('react'),
  UserEditor = require('./user_editor');

var UserManager = React.createClass({
  displayName: 'UserManager',
  propTypes: {
    users: React.PropTypes.object.isRequired
  },
  render() {
    var users = this.props.users, userEditors = [];
    for(let key in users) {
      userEditors.push(this._buildUserEditor(key, users[key]));
    }
    userEditors.push(this._buildUserEditor());
    return (<div className='user-manager'>
      <h1>User Manager</h1>
      <h3>Colors</h3>
      <div className="taskboard-colors">
        <div className="taskboard-sample yellow">
          Yellow
        </div>
        <div className="taskboard-sample orange">
          Orange
        </div>
        <div className="taskboard-sample mint">
          Mint
        </div>
        <div className="taskboard-sample aqua">
          Aqua
        </div>
        <div className="taskboard-sample blue">
          Blue
        </div>
        <div className="taskboard-sample purple">
          Purple
        </div>
        <div className="taskboard-sample pink">
          Pink
        </div>
        <div className="taskboard-sample white">
          White
        </div>
        <div className="taskboard-sample black">
          Black
        </div>
      </div>
      {userEditors}
    </div>);
  },
  _buildUserEditor(key = 'new-user', user = undefined) {
    return <UserEditor key={key} id={key} user={user} />
  }
});

module.exports = UserManager;
