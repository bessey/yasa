var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify-cache');
var compileSass = require('broccoli-sass');
var filterReact = require('broccoli-react');
var es6transpiler = require('broccoli-es6-transpiler');

var env = 'test';

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

var sourceTrees = [
  app,
  styles,
  bower,
  'bower_components/bootstrap-sass-official/assets/stylesheets'
]

if (env === 'test') {
  sourceTrees.push(testsTree);
}

var appAndDependencies = mergeTrees(sourceTrees, { overwrite: true })

var appJs;

// If we are testing, return the compiled file with testing sources.
if (env === 'test') {
  appJs = browserify(appAndDependencies, {
    entries: [
      './js/test_application.js',
      './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
    ],
    outputFile: '/js/test_application.js'
  });
} else {
  appJs = browserify(appAndDependencies, {
    entries: [
      './js/application.js',
      './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
    ],
    outputFile: '/js/application.js'
  });
}

var appCss = compileSass(sourceTrees, 'css/application.scss', '/css/application.css', {});

var publicFiles = pickFiles('public', {
  srcDir: '/',
  destDir: ''
})

// TESTS

module.exports = mergeTrees([appJs, appCss, publicFiles])
