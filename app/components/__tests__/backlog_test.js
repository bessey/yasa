var React   = require('react/addons'),
    Backlog = require('../backlog');

var TestUtils = React.addons.TestUtils;

describe('Backlog', () => {
  it('renders without raising errors', () => {
    var backlogParams = {
      stories: {},
      line: {},
      users: {}
    };
    var TestWrapper = Helper.TestWrapper(Backlog, backlogParams);
    var backlog = TestUtils.renderIntoDocument(<TestWrapper />);
  })
})
