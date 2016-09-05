module.exports = function () {
    var client = './';
    var assets = './assets/';
    var temp = './.tmp/';
    var build = './build';
    var components = './app/components/**/*.js';
    var directives = './app/directives/**/*.js';
    var services = './app/services/**/*.js';

    var config = {
        client: client,
        index: './index.html',
        css: assets + 'styles/**/*.css',
        temp: temp,
        htmltemplates: './components/**/*.html',
        build: build,
        componentsJs: components,
        directivesJs: directives,
        servicesJs: services,
        js: [
            './app.js',
            components,
            directives,
            services
        ],
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
                root: '/components'
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