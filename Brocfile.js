'use strict';
const jshintTree = require('broccoli-jshint');
const esTranspiler = require('broccoli-babel-transpiler');
const mergeTrees = require('broccoli-merge-trees');
const compileSass = require('broccoli-sass');
const concat = require('broccoli-concat');
const fastBrowserify = require('broccoli-fast-browserify');

const jsSourceDir = "web/static/js"
const cssSourceDir = "web/static/css"
const publicSourceDir = "web/static/assets"

let tree = jsSourceDir;

// JS
tree = esTranspiler(tree, {
  filterExtensions:['js', 'jsx'],
  moduleIds: true,
  modules: 'common'
});
// const hintTree = jshintTree(tree);
// tree = mergeTrees([tree, hintTree], {overwrite: true});

tree = fastBrowserify(tree, {
  bundles: {
    'js/application.js': {
      entryPoints: ['app.js']
    }
  }
});

let vendorTree = concat('bower_components', {
  inputFiles: [
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
