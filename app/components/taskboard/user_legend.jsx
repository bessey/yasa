var React = require('react');

module.exports = React.createClass({
  displayName: 'SpecButton',
  propTypes: {
    users: React.PropTypes.object.isRequired
  },
  render() {
    var users = this.props.users, usersLegend = [];
    for(let key in users) {
      usersLegend.push(this._buildUserLegend(users[key]));
    }
    return <div className="row">
      {usersLegend}
    </div>
  },
  _buildUserLegend(user) {
    return <div key={user.name} className={`col-xs-2 col-sm-1 ${user.color}`}>
      {user.name}
    </div>
  }
});
