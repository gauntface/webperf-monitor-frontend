var express = require('express');
var exphbs  = require('express3-handlebars');
var RequestController = require('./controller/RequestController.js');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', RequestController.getIndexRequest);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});