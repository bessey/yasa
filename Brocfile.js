var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify');
var compileSass = require('broccoli-sass');
var filterReact = require('broccoli-react');


var app = pickFiles('app', {
  srcDir: '/',
  destDir: 'js'
})

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

var appJs = filterReact(appAndDependencies);

appJs = browserify(appJs, {
  entries: [
    './js/application.js',
    './vendor/react/react.js',
    './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ],
  browserify: {},
  outputFile: '/js/application.js'
})

var appCss = compileSass(sourceTrees, 'css/application.scss', '/css/application.css', {});

var publicFiles = pickFiles('public', {
  srcDir: '/',
  destDir: ''
})


module.exports = mergeTrees([appJs, appCss, publicFiles])