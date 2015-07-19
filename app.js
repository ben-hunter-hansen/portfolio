var feedApi = require('./server/api/feed');
var database = require('./server/db');
var express = require('express');

var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
app.use(express.static(__dirname + '/app'));
app.use('/feed',feedApi);



app.listen(port);

console.log('Listening on port ' + port);

database.init('posts');

exports = module.exports = app;                         
