module.exports = function () {
    var client = './';
    var assets = './assets/';

    var config = {
        client: client,
        index: client + 'index.html',
        css: assets + 'styles/**/*.css',
        js: [
                './app.js',
                './components/**/*.js',
                './directives/**/*.js',
                './services/**/*.js'
        ],
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
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