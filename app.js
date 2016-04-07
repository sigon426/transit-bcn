
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = express();
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/assets/images/traffic.ico'));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


// Routes
app.get('/dadestrams', routes.index);
app.get('/API/dadestrams', routes.dadestrams);

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 3000;
app.listen(port);

// Render some console log output
console.log('Listening on port ' + port);
