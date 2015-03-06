var gulp       = require('gulp'),
    del        = require('del'),
    sass       = require('gulp-sass'),
    bower      = require('gulp-bower'),
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
    mocha      = require('gulp-mocha'),
    cache      = require('gulp-cached'),
    plumber    = require('gulp-plumber'),
    remember   = require('gulp-remember'),
    sequence   = require('gulp-sequence');


var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

var sourceJsGlob = ['./app/**/*.{js,jsx}', './spec/**/*.{js,jsx}', 'app.js', 'client.jsx', './config/**/*.{js,jsx}'];

gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('styles', function () {
  return gulp.src('styles/application.scss')
    .on('error', gutil.log.bind(gutil, 'Sass Error'))
    .pipe(sass({
      includePaths: [
        config.bowerDir + '/bootstrap-sass-official/assets/stylesheets/',
        config.bowerDir + '/fontawesome/scss'
      ]
    }))
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('server-js', function () {
  return gulp.src(sourceJsGlob, {cwdbase: true})
    .pipe(plumber())
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

gulp.task('test-once', function () {
  require('./dist/config/test');
  return gulp.src('dist/spec/**/*_spec.js', {read: false})
    .on('error', gutil.log.bind(gutil, 'Mocha Error'))
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('clean', function(cb) {
  del(['dist/*'], cb)
});

gulp.task('client', function () {
  gulp.start('client-js');
  gulp.start('serve');
});

gulp.task('watch', function () {
  gulp.watch(['styles/**/*.scss'], ['styles']);
  gulp.watch(sourceJsGlob, ['server-js']);
  gulp.start('client-js');
});


gulp.task('test', function () {
  gulp.start('test-once');
  gulp.watch(sourceJsGlob, ['test-once']);
});
gulp.task('default', sequence('server-js', 'styles', 'serve'));
