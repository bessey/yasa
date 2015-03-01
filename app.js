var debug         = require('debug')('app');
var path          = require('path');
var logger        = require('morgan');
var express       = require('express');
var serverRender  = require('./dist/js/server');
var api           = require('./dist/js/api');
var authorizer    = require('./dist/js/authorizer');
var app           = express();


app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));

if(app.settings.env == 'production') {
  app.use(authorizer);
}
app.use(express.static(__dirname + '/dist'));
app.use('/api/v1', api);
app.get('/', serverRender);

// error pages
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.send('<pre>' + err.stack + '</pre>');
});

app.set('port', process.env.PORT || 4200);

var server = app.listen(app.get('port'), function () {
  debug('Express ' + app.get('env') + ' server listening on port ' + this.address().port + ' in ' + app.settings.env + ' mode');
});

module.exports = app;
