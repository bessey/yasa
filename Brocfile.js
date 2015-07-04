'use strict';
const jshintTree = require('broccoli-jshint');
const esTranspiler = require('broccoli-babel-transpiler');
const mergeTrees = require('broccoli-merge-trees');
const compileSass = require('broccoli-sass');
const concat = require('broccoli-concat');
const optimizeRequireJs = require('broccoli-requirejs');

const jsSourceDir = "web/static/js"
const cssSourceDir = "web/static/css"
const publicSourceDir = "web/static/assets"

let tree = jsSourceDir;

// JS
tree = esTranspiler(tree, {
  filterExtensions:['js', 'jsx'],
  moduleIds: true,
  modules: 'amd'
});
// const hintTree = jshintTree(tree);
// tree = mergeTrees([tree, hintTree], {overwrite: true});

let libraryTree = 'bower_components';
tree = mergeTrees([tree, libraryTree]);

tree = optimizeRequireJs(tree, {
  verbose: true,
  requirejs: {
    name: 'app',
    out: './js/app.js',
    bundles: {

    }
    paths: {
      "react": 'react/react.min',
      "react-router": 'react-router/build/umd/ReactRouter.min',
      "formsy-react": 'formsy-react/release/formsy-react.min',
      "alt": 'alt/dist/alt'
    }
  }
});

let vendorTree = concat('bower_components', {
  inputFiles: [
    'requirejs/require.js',
    'jquery/dist/jquery.min.js',
    'bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ],
  outputFile: '/js/vendor.js'
});
tree = mergeTrees([tree, vendorTree]);

// CSS
var styleTree = cssSourceDir;
var bootstrapTree = "bower_components/bootstrap-sass/assets/stylesheets";
styleTree = compileSass([styleTree, bootstrapTree], "app.scss", "css/app.css", {});
tree = mergeTrees([tree, styleTree]);

// STATIC
var publicDir = publicSourceDir;
// tree = mergeTrees([tree, publicDir]);

module.exports = tree;
