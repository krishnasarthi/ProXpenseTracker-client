var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var config = require('./gulp.config.js')();

gulp.task('vet', function () {
    return gulp
        .src([
        './directives/**/*.js',
		'./services/**/*.js',
		'./components/**/*.js',
		'./*.js'
		])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('wiredep', function () {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});