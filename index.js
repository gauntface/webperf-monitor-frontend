var express = require('express');
var RequestController = require('./controller/RequestController.js');
var app = express();

app.get('/', RequestController.getIndexRequest);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});