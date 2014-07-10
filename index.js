var fs = require('fs');
var pkg = require( './package.json' );

var argv = require('minimist')(process.argv.slice(2));

var printHelp = function() {
    console.log([
        'webperf-monitor',
        pkg.description,
        '',
        'Usage:',
        '    $ webperf-monitor -c <path-to-config>'
    ].join('\n'));
};

if(argv.v || argv.version) {
    console.log(pkg.version);
    return;
}

if(argv.h || argv.help) {
    printHelp();
    return;
}

var configFilePath = './config/config.js'
var customConfigPathFile = './.config/';
var customConfigFileName = 'settings';

if(argv.c || argv.config) {
    configFilePath = argv.c || argv.config;
}

if(configFilePath.indexOf('.') == 0) {
	configFilePath = configFilePath.substring(1);
	configFilePath = __dirname + configFilePath;
}

console.log('Looking for config file at '+configFilePath);

var config;
try {
    config = require(configFilePath);
} catch(exception) {}

if(!config) {
    console.error('No config file could be found.');
    process.exit();
    return;
}

GLOBAL.configFile = configFilePath;

var express = require('express');
var exphbs  = require('express3-handlebars');
var RequestController = require('./controller/RequestController.js');

var app = express();
app.engine('hbs', exphbs({extname:'.hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.get('/', RequestController.getIndexRequest);

app.use('/styles', express.static(__dirname + '/dist/styles'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});