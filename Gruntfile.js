var path = require('path');
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    broccoli: {
      dev: {
        env: 'development',
        dest: 'dist'
      },
      prod: {
        env: 'production',
        dest: 'dist'
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          watch: 'dist/',
          delay: 500
        }
      }
    },
    watch: {
      mocha: {
        files: ['dist/js/application.js'],
        tasks: ['mochaTest']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        clearRequireCache: true
      },
      src: ['dist/js/spec/**/*.js']
    }
  });

  // On watch events, if the changed file is a test file then configure mochaTest to only
  // run the tests from that file. Otherwise run all the tests
  var defaultTestSrc = grunt.config('mochaTest.src');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('mochaTest.test.src', defaultTestSrc);
    if (filepath.match('dist/js/spec/')) {
      grunt.config('mochaTest.test.src', filepath);
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('serve', ['nodemon:dev']);
  grunt.registerTask('assets', ['broccoli:dev:watch']);
  grunt.registerTask('test',  ['mochaTest']);
  grunt.registerTask('build', ['broccoli:prod:build']);

  grunt.registerTask('default', ['serve']);
};
