let Helper      = require('../spec_helper.js'),
    React       = require('react/addons'),
    App         = require('../../app/components/app'),
    Router      = require('react-router'),
    routes      = require('../../app/routes'),
    dataManager = require('../../app/lib/router_data_manager'),
    {renderIntoDocument, Simulate, findRenderedDOMComponentWithClass} = React.addons.TestUtils;

let initialProps = dataManager.initialise();

describe('App', () => {
  it('renders without raising errors', () => {
    Router.run(routes, function (Handler) {
      Helper.jsdom();
      let handler = renderIntoDocument(<Handler {...initialProps} />);
      dataManager.handleData(handler);
      let backlogLink = findRenderedDOMComponentWithClass(handler, 'navbar-backlog');
      Simulate.click(backlogLink);

      expect(backlogLink.getDOMNode().className).to.equal('navbar-backlog active');
    });
  })
})
