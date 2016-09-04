var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('vet',function(){
	return gulp
	.src([
		'./components/**/*.js',
		'./directives/**/*.js',
		'./services/**/*.js',
		'./*.js'
		])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish',{verbose:true}));
});