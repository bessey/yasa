let Helper      = require('../spec_helper.js'),
    React       = require('react/addons'),
    App         = require('../../app/components/app'),
    Router      = require('react-router'),
    routes      = require('../../app/routes'),
    dataManager = require('../../app/lib/router_data_manager');

Helper.jsdom();

let initialProps = dataManager.initialise();

describe('App', () => {
  it('renders without raising errors', () => {
    Router.run(routes, function (Handler) {
      let handler = React.addons.TestUtils.renderIntoDocument(<Handler {...initialProps} />);
      dataManager.handleData(handler);
    });
  })
})
