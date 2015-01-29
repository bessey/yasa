module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    broccoli: {
      dev: {
        dest: 'dist',
      }
    },
    watch: {
      files: ['app/**/*.js', 'app/**/*.jsx', 'spec/**/*_spec.js'],
      tasks: ['broccoli:dev:watch']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 4200,
          base: 'dist'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('default', ['broccoli']);
};