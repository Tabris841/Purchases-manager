var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    karma = require('gulp-karma');

gulp.task('connect', function() {
    connect.server({
        port: 3000,
        root: 'app',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('app/*.html')
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp.src('app/styles/*.scss')
        .pipe(sass({
            onError: function(e) {
                console.log(e);
            }
        }))
        .pipe(gulp.dest('app/styles/'))
        .pipe(connect.reload());
});

gulp.task('lint', function() {
    gulp.src(['app/scripts/*.js', 'app/scripts/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
    gulp.src(['app/scripts/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app'))
        .pipe(connect.reload());
});

gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./test')
    .pipe(karma({
      configFile: './test/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});


gulp.task('watch', function() {
    gulp.watch(['app/*.html', 'app/**/*.html'], ['html']);
    gulp.watch('app/styles/*.scss', ['sass']);
    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], ['lint', 'browserify']);
    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], ['test']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'browserify', 'lint', 'test']);