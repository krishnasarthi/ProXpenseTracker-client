var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var config = require('./gulp.config.js')();
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('vet', function () {
    return gulp
        .src(config.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('optimize', ['inject'], function () {
    console.log('Optimizing javascript, css, html');

    return gulp
        .src(config.index)
        .pipe($.plumber({
            handleError: handleError
        }))
});

gulp.task('inject', function () {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('clean-folder', function () {
    cleanFolder(config.temp);
    cleanFolder(config.build);
});

gulp.task('templatecache', function () {
    console.log('Creating AngularJS $templatecache');

    return gulp
        .src(config.htmltemplates)
        //.pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

//Styles task
gulp.task('styles', function () {
    gulp.src(config.css)
        .pipe($.plumber({
            handleError: handleError
        }))
        .pipe($.concat('build.css'))
        .pipe(cleanCSS())
        .pipe(cachebust.resources())
        .pipe(gulp.dest(config.build));
});

gulp.task('fixComponents', function () {
    gulp.src(config.componentsJs)
        .pipe($.plumber({
            handleError: handleError
        }))
        .pipe($.fixmyjs())
        .pipe(gulp.dest(config.componentsJs));
});

function cleanFolder(path, cb) {
    console.log('Cleaning folder ' + path);
    del(path, cb);
}

function handleError(error) {
    console.log(error);
    this.emit('end');
}