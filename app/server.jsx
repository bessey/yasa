var React         = require('react'),
  Router        = require('react-router'),
  routes = require('./routes'),
  Html   = require('./components/Html');

module.exports = function (req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {

    var markup = React.renderToString(<Handler />);
    var html   = React.renderToStaticMarkup(<Html markup={markup} />);

    res.send('<!DOCTYPE html>' + html);
  });
};
