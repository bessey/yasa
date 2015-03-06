require('./config/YASA_ENVIRONMENT');
// HELLO MATTH
var React        = require('react'),
  Router         = require('react-router'),
  Firebase       = require('firebase'),
  Routes         = require('./app/routes'),
  DataManager    = require('./app/lib/router_data_manager');

require('bootstrap');

document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    let props = window.DATA;

    UserStore.warmCache(props.users);

    let handler = React.render(<Handler {...props} />, document.body);

    DataManager.handleData(handler);
  });
});
