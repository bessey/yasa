var filterReact = require('broccoli-react');
var jshintTree = require('broccoli-jshint');
var esTranspiler = require('broccoli-babel-transpiler');
var fastBrowserify = require('broccoli-fast-browserify');
var mergeTrees = require('broccoli-merge-trees');
var injectLivereload = require('broccoli-inject-livereload');
var compileSass = require('broccoli-sass');
var concat = require('broccoli-concat');

var tree = "app";

// JS
tree = filterReact(tree);
var hintTree = jshintTree(tree);
tree = mergeTrees([tree, hintTree]);
tree = esTranspiler(tree);
tree = fastBrowserify(tree, {
  bundles: {
    'js/application.js': {
      entryPoints: ['app.js']
    }
  }
});

var vendorTree = concat('bower_components', {
  inputFiles: [
    'jquery/dist/jquery.min.js',
    'bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ],
  outputFile: '/js/vendor.js'
});
tree = mergeTrees([tree, vendorTree]);

// CSS
var styleTree = "styles";
var bootstrapTree = "bower_components/bootstrap-sass/assets/stylesheets";
styleTree = compileSass([styleTree, bootstrapTree], "app.scss", "css/app.css", {});
tree = mergeTrees([tree, styleTree]);

// STATIC
var publicDir = "public";
// publicDir = injectLivereload(publicDir);
tree = mergeTrees([tree, publicDir]);

module.exports = tree;
