var debug         = require('debug')('app');
var path          = require('path');
var logger        = require('morgan');
var express       = require('express');
var serverRender  = require('./dist/js/server');
var api           = require('./dist/js/api');
var app           = express();


app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));

app.use(express.static(__dirname + '/dist'));
app.use('/api/v1', api);
app.get('/', serverRender);

// error pages
app.use(function (err, req, res, next) {
  res.status(500);
  // TODO: simple page for errors not in dev environment
  res.send('<pre>' + err.stack + '</pre>');
});

app.set('port', process.env.PORT || 4200);

var server = app.listen(app.get('port'), function () {
  debug('Express ' + app.get('env') + ' server listening on port ' + this.address().port);
});

module.exports = app;
