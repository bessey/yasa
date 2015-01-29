module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    broccoli: {
      dev: {
        dest: 'dist',
      }
    },
    watch: {
      files: ['app/**/*.js', 'app/**/*.jsx'],
      tasks: ['broccoli:dev:watch']
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
  grunt.registerTask('default', ['broccoli']);
};