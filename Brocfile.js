var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify');
var compileSass = require('broccoli-sass');
var filterReact = require('broccoli-react');
var es6transpiler = require('broccoli-es6-transpiler');


var app = pickFiles('app', {
  srcDir: '/',
  destDir: 'js'
})
app = filterReact(app);
app = es6transpiler(app, {
  disallowDuplicated: false,
  includePolyfills: true,
  globals: {
    "jQuery": false,
    "__REACT_DEVTOOLS_GLOBAL_HOOK__": false
  }
});

var styles = pickFiles('styles', {
  srcDir: '/',
  destDir: 'css' // move under appkit namespace
})

var bower = pickFiles('bower_components', {
  srcDir: '/',
  destDir: 'vendor' // move under appkit namespace
})

var sourceTrees = [
  app,
  styles,
  bower,
  'bower_components/bootstrap-sass-official/assets/stylesheets'
]

var appAndDependencies = mergeTrees(sourceTrees, { overwrite: true })

appJs = browserify(appAndDependencies, {
  entries: [
    './js/application.js',
    './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ],
  browserify: {},
  outputFile: '/js/application.js'
});

var appCss = compileSass(sourceTrees, 'css/application.scss', '/css/application.css', {});

var publicFiles = pickFiles('public', {
  srcDir: '/',
  destDir: ''
})


module.exports = mergeTrees([appJs, appCss, publicFiles])