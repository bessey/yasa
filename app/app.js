var debug        = require('debug')('app');
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var serverRender = require('./server');

var app = express();

// app.use(express.static(path.join(__dirname, '../dist/')));

app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));

// use react routes
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

var main = function(){
    // main code
}

if (require.main === module) {
    main();
}

module.exports = app;
