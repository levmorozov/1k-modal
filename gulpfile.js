var gulp = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var uglifycss = require("gulp-uglifycss");

gulp.task('min', function() {
    gulp.src('jquery.m1k.js')
        .pipe(uglify())
        .pipe(rename('jquery.m1k.min.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
    gulp.src('jquery.m1k.css')
        .pipe(uglifycss())
        .pipe(rename('jquery.m1k.min.css'))
        .pipe(gulp.dest('.'));
});