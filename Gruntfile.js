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
    watch: {
      karma: {
        files: ['dist/**/*'],
        tasks: ['karma:unit:run']
      },
      broccoli: {
        files: ['app/**/*.js', 'app/**/*.jsx', 'spec/**/*_spec.js'],
        tasks: ['broccoli:dev:watch']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      }
    },
    express: {
      dist: {
        options: {
          port: 4200,
          hostname: '*',
          bases: './dist',
          server: './dist/js/app',
          showStack: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('serve', ['broccoli:dev:build', 'express:dist', 'watch:broccoli']);
  grunt.registerTask('test',  ['karma:unit:start', 'watch:karma']);
  grunt.registerTask('build', ['broccoli:prod:build']);

  grunt.registerTask('default', ['serve']);
};
