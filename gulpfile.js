const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {
  gulp.src(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./app.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('app_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app_client'))
});

gulp.task('watch', function () {
  watch(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'], function () {
    gulp.start('scripts');
  });
});

gulp.task('default', gulp.series(gulp.parallel('scripts', 'watch')));