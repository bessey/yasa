var gulp       = require('gulp'),
    babel      = require('gulp-babel'),
    bower      = require('gulp-bower'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    cache      = require('gulp-cached'),
    del        = require('del'),
    gutil      = require('gulp-util'),
    jest       = require('gulp-jest'),
    nodemon    = require('gulp-nodemon'),
    plumber    = require('gulp-plumber'),
    react      = require('gulp-react'),
    remember   = require('gulp-remember'),
    replace    = require('gulp-replace'),
    sass       = require('gulp-sass'),
    sequence   = require('gulp-sequence')
    source     = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify   = require('watchify');

require("harmonize")();
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

gulp.task('test', function () {
  require('./dist/config/test');
  return gulp.src('./dist/').pipe(jest({
      setupEnvScriptFile: './config/test.js',
      unmockedModulePathPatterns: [
        "node_modules/react",
        "node_modules/react_forms"
      ],
      testPathIgnorePatterns: [
        "node_modules",
        "bower_components",
        "spec/support"
      ],
      moduleFileExtensions: ["js"]
  }));
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

gulp.task('default', sequence('server-js', 'styles', 'serve'));
