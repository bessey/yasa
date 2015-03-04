let Helper  = require('./spec_helper.js'),
    React   = require('react/addons'),
    Taskboard = require('../app/components/taskboard');

Helper.jsdom();

describe('Taskboard', () => {
  it('renders without raising errors', () => {
    var TestWrapper = Helper.TestWrapper(Taskboard, {taskboard: {}, users: {}});
    var backlog = React.addons.TestUtils.renderIntoDocument(<TestWrapper />);
  })
})
