var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch');

gulp.task('lint', function() {
  return gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(watch('./*.js'));
});

gulp.task('default', function () {
  return gulp.src('./*.js')
    .pipe(watch('./*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});