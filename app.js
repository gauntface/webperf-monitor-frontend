'use strict';

function startServer () {
  var configFilePath = './config/config.js';
  var express = require('express');
  var exphbs  = require('express3-handlebars');
  var RequestController = require('./controller/RequestController.js');
  var app = express();
  var server;

  GLOBAL.configFile = configFilePath;

  app.engine('hbs', exphbs({extname:'.hbs', defaultLayout: 'main'}));
  app.set('view engine', 'hbs');

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.get('/', RequestController.getIndexRequest);
  app.get('/settings', RequestController.getSettingsRequest);
  app.post('/settings/save', RequestController.getSettingsSubmitRequest);

  app.use('/styles', express.static(__dirname + '/dist/styles'));
  app.use('/scripts', express.static(__dirname + '/dist/scripts'));

  server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });
}

startServer();
