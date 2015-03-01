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
      karma: {
        files: ['dist/**/*'],
        tasks: ['karma:unit:run']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('serve', ['nodemon:dev']);
  grunt.registerTask('assets', ['broccoli:dev:watch']);
  grunt.registerTask('test',  ['karma:unit:start', 'watch:karma']);
  grunt.registerTask('build', ['broccoli:prod:build']);

  grunt.registerTask('default', ['serve']);
};
