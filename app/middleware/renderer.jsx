var React        = require('react'),
  Router         = require('react-router'),
  routes         = require('../routes'),
  Html           = require('../components/html'),
  DataManager    = require('../lib/router_data_manager');

let data = DataManager.handleData();

module.exports = function (req, res) {
  Router.run(routes, req.url, function (Handler, state) {

    let dependencyClone = JSON.parse(JSON.stringify(data))
    var markup = React.renderToString(<Handler {... data} />);
    var html   = React.renderToStaticMarkup(<Html markup={markup} dependencies={dependencyClone} />);

    res.send('<!DOCTYPE html>' + html);
  });
};
