let express    = require('express'),
  app          = express(),
  env          = app.get('env');
require("./config/" + env);

require("harmonize")();
require("es6-shim");

let debug      = require('debug')('app'),
  path         = require('path'),
  logger       = require('morgan'),
  serverRender = require('./app/middleware/renderer'),
  api          = require('./app/middleware/api'),
  authorizer   = require('./app/middleware/authorizer');

app.use(logger(env === 'production' ? 'combined' : 'dev'));

if(env == 'production') {
  app.use(authorizer);
}
app.use(express.static(__dirname + '/public'));
app.use('/api/v1', api);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

// Everything else goes to the server
app.get('*', serverRender);

app.set('port', process.env.PORT || 4200);

let server = app.listen(app.get('port'), function () {
  debug('Express ' + env + ' server listening on port ' + this.address().port);
});

module.exports = app;
