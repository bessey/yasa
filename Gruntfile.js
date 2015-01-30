module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    broccoli: {
      dev: {
        dest: 'dist',
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

  grunt.registerTask('serve', ['connect', 'watch:broccoli']);
  grunt.registerTask('test',  ['karma:unit:start', 'watch:karma']);

  grunt.registerTask('default', ['serve']);
};