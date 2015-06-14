var filterReact = require('broccoli-react');
var jshintTree = require('broccoli-jshint');
var esTranspiler = require('broccoli-babel-transpiler');
var fastBrowserify = require('broccoli-fast-browserify');
var mergeTrees = require('broccoli-merge-trees');
var injectLivereload = require('broccoli-inject-livereload');

var tree = "app";

tree = filterReact(tree);
var hintTree = jshintTree(tree, {
  jshintrcRoot: '.'
});
tree = esTranspiler(tree);
tree = fastBrowserify(tree, {
  bundles: {
    'application.js': {
      entryPoints: ['app.js']
    }
  }
});

var publicDir = "public";
publicDir = injectLivereload(publicDir);

module.exports = mergeTrees([tree, hintTree, publicDir]);
