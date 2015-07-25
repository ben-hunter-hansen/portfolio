var feedApi = require('./server/api/feed');
var database = require('./server/database/db');
var express = require('express');

var compression = require('compression');
var sanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');
var logger = require('express-logger');

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sanitizer());
app.use(logger({path: 'server/log/log.txt'}));
app.use(compression());
app.use(express.static(__dirname + '/app'));
app.use('/feed',feedApi);



app.listen(port);

console.log('Listening on port ' + port);

//database.init('posts');

exports = module.exports = app;                         
