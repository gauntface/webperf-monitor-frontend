'use strict';

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

var configFilePath = './config/config.js';

if(argv.c || argv.config) {
    configFilePath = argv.c || argv.config;
}

if(configFilePath.indexOf('.') === 0) {
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
    //process.exit();
    //return;
    //require('./setup.js');
}

require('./app.js');
