var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var server = require('gulp-express');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.ejs')
      .pipe(gulp.dest('dist'));
});

gulp.task('default',['browserify', 'copy','watch']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});

gulp.task('server',function(){
	 server.run({
        file: 'server.js',
        port:3000
    });
})