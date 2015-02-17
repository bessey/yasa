var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify-cache');
var compileSass = require('broccoli-sass');
var filterReact = require('broccoli-react');
var es6transpiler = require('broccoli-es6-transpiler');
var replace = require('broccoli-replace');

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
  destDir: 'css'
})

var bower = pickFiles('bower_components', {
  srcDir: '/',
  destDir: 'vendor'
})

var testsTree = pickFiles('spec', {
  srcDir: '/',
  files: ['*.js', '**/*.js'],
  destDir: 'js/spec'
});

var devSourceTrees = [
  app,
  styles,
  bower,
  'bower_components/bootstrap-sass-official/assets/stylesheets'
]

var testSourceTrees = [
  app,
  styles,
  bower,
  testsTree,
  'bower_components/bootstrap-sass-official/assets/stylesheets'
]

var appAndDependencies = mergeTrees(devSourceTrees, { overwrite: true })
var testAppAndDependencies = mergeTrees(testSourceTrees, { overwrite: true })

var testJs = browserify(testAppAndDependencies, {
  entries: [
    './js/test_application.js',
    './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ],
  outputFile: '/js/test_application.js'
});

var appJs = browserify(appAndDependencies, {
  entries: [
    './js/application.js',
    './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ],
  outputFile: '/js/application.js'
});

appJs = replace(appJs, {
  files: [
    '**/*.js'
  ],
  patterns: [
    {
      match: 'YASA_ENVIRONMENT',
      replacement: 'development'
    }
  ]
});

var appCss = compileSass(devSourceTrees, 'css/application.scss', '/css/application.css', {});

var publicFiles = pickFiles('public', {
  srcDir: '/',
  destDir: ''
})

// TESTS

module.exports = mergeTrees([appJs, testJs, appCss, publicFiles])
