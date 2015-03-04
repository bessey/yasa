let debug      = require('debug')('app'),
  path         = require('path'),
  logger       = require('morgan'),
  express      = require('express'),
  serverRender = require('./app/middleware/renderer'),
  api          = require('./app/middleware/api'),
  authorizer   = require('./app/middleware/authorizer'),
  app          = express();

require("harmonize")();
require("es6-shim");

app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));

if(app.get('env') == 'production') {
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
  debug('Express ' + app.get('env') + ' server listening on port ' + this.address().port + ' in ' + app.settings.env + ' mode');
});

module.exports = app;
