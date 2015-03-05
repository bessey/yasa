let Helper  = require('./spec_helper.js'),
    React   = require('react/addons'),
    Backlog = require('../app/components/backlog');

Helper.jsdom();


describe('Backlog', () => {
  it('renders without raising errors', () => {
    var TestWrapper = Helper.TestWrapper(Backlog, {stories: {}, line: {}, users: {}});
    var backlog = React.addons.TestUtils.renderIntoDocument(<TestWrapper />);
  })
})
