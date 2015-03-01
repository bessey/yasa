var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var browserify = require('broccoli-browserify-cache');
var compileSass = require('broccoli-sass');
var filterReact = require('broccoli-react');
var es6transpiler = require('broccoli-es6-transpiler');
var replace = require('broccoli-replace');
var env = require('broccoli-env').getEnv();

// CLIENT SIDE
var finalExport;

var app = pickFiles('./app', {
  srcDir: '/',
  files: ['**/*.js', '**/*.jsx'],
  destDir: '/js'
})
var server = pickFiles('./server', {
  srcDir: '/',
  files: ['**/*.js'],
  destDir: '/js'
})

var appAndServer = mergeTrees([app, server]);

appAndServer = filterReact(appAndServer);
appAndServer = es6transpiler(appAndServer, {
  disallowDuplicated: false,
  includePolyfills: true,
  globals: {
    "jQuery": false,
    "$": false,
    "__REACT_DEVTOOLS_GLOBAL_HOOK__": false
  }
});

var styles = pickFiles('./styles', {
  srcDir: '/',
  files: ['**/*.scss'],
  destDir: '/css'
})

var bootstrap = pickFiles('./bower_components/bootstrap-sass-official', {
  srcDir: '/',
  destDir: 'bootstrap'
})

// var testsTree = pickFiles('spec', {
//   srcDir: '/',
//   files: ['*.js', '**/*.js'],
//   destDir: 'js/spec'
// });

var devSourceTrees = [
  appAndServer,
  styles,
  bootstrap
]

// var testSourceTrees = [
//   app,
//   styles,
//   bower,
//   testsTree,
//   'bower_components/bootstrap-sass-official/assets/stylesheets'
// ]

var allDependencies = mergeTrees(devSourceTrees, { overwrite: true })

// module.exports = appAndDependencies

// var testAppAndDependencies = mergeTrees(testSourceTrees, { overwrite: true })

// var testJs = browserify(testAppAndDependencies, {
//   entries: [
//     './js/test_application.js',
//     './vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js'
//   ],
//   outputFile: '/js/test_application.js'
// });

var allDependencies = replace(allDependencies, {
  files: [
    '**/*.js'
  ],
  patterns: [
    {
      match: 'YASA_ENVIRONMENT',
      replacement: env
    }
  ]
});

var clientJs = browserify(allDependencies, {
  entries: [
    './js/client.js',
    './bootstrap/assets/javascripts/bootstrap.js'
  ],
  outputFile: '/js/application.js'
});

var serverJs = allDependencies;

var appCss = compileSass(devSourceTrees, 'css/application.scss', '/css/application.css', {});

var publicFiles = pickFiles('./public', {
  srcDir: '/',
  destDir: '/'
})

var finalExport = mergeTrees([clientJs, appCss, serverJs, publicFiles]);
// TODO: Don't have the server JS out in public
module.exports = finalExport
