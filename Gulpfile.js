var gulp       = require('gulp'),
    del        = require('del'),
    sass       = require('gulp-sass'),
    bower      = require('gulp-bower'),
    watch      = require('gulp-watch'),
    react      = require('gulp-react'),
    babel      = require('gulp-babel');
    gutil      = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    watchify   = require('watchify'),
    browserify = require('browserify'),
    nodemon    = require('gulp-nodemon'),
    replace    = require('gulp-replace');


var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

var bundler = watchify(browserify('./dist/client.js', watchify.args));

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('styles', function () {
  return gulp.src('styles/application.scss')
    .pipe(watch('styles/**/*.scss'))
    .pipe(sass({
      includePaths: [
        config.bowerDir + '/bootstrap-sass-official/assets/stylesheets/',
        config.bowerDir + '/fontawesome/scss'
      ]
    }))
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('server-js', function () {
  return gulp.src(['**/*.{js,jsx}', '!{node_modules,dist,bower_components}/**'])
    .pipe(watch(['app/**/*.{js.jsx}', 'config/**/*.js', '*.js']))
    .pipe(replace(/YASA_ENVIRONMENT/, 'development'))
    .pipe(react({}))
    .pipe(babel())
    .pipe(gulp.dest('dist/'))
});

gulp.task('client-js', ['server-js'], function () {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('application.js'))
    // optional, remove if you dont want sourcemaps
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest('./dist/public/js/'));
});

gulp.task('serve', function () {
  return nodemon({
    cwd: 'dist',
    script: 'app.js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('clean', function(cb) {
    del(['dist/*'], cb)
});

gulp.task('default', ['bower', 'clean'], function() {
    gulp.start('styles');
    gulp.start('server-js');
    gulp.start('client-js');
});
