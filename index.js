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