var gulp = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');

gulp.task('min', function() {
    gulp.src('jquery.modal1k.js')
        .pipe(uglify())
        .pipe(rename('jquery.modal1k.min.js'))
        .pipe(gulp.dest('.'));
});