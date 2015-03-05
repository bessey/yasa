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
    replace    = require('gulp-replace'),
    mocha      = require('gulp-mocha');


var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

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
    .pipe(watch(['app/**/*.{js.jsx}', 'config/**/*.js', 'spec/**/*.js', '*.js']))
    .pipe(react({}))
    .pipe(babel())
    .pipe(replace(/YASA_ENVIRONMENT/, 'development'))
    .pipe(gulp.dest('dist/'))
});

var bundler = watchify(browserify('./dist/client.js', watchify.args));
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle () {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/public/js'));
}

gulp.task('client-js', bundle);

gulp.task('serve', function () {
  return nodemon({
    cwd: 'dist',
    script: 'app.js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('test', function () {
  require('./dist/config/test');
  return gulp.src('dist/spec/**/*_spec.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('clean', function(cb) {
  del(['dist/*'], cb)
});

gulp.task('server', ['bower'], function() {
  gulp.start('styles');
  gulp.start('server-js');
});

gulp.task('client', function () {
  gulp.start('client-js');
  gulp.start('serve');
});
