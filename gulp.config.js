module.exports = function () {
    var client = './';
    var assets = './assets/';
    var temp = './.tmp/';
    var build = './build';
    var app = './app';

    var config = {
        app: app,
        client: client,
        index: './index.html',
        buildIndex:'./index-build.html',
        css: assets + 'styles/**/*.css',
        temp: temp,
        htmltemplates: './app/components/**/*.html',
        build: build,
        js: './app/**/*.js',
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        templateCache: {
            file: 'templates.js',
            options: {
                module: 'xpenseTracker',
                standAlone: false,
                root: '/app/components'
            }
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;

};