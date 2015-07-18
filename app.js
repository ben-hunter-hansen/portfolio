var feedApi = require('./api/feed');
var express = require('express');

var compression = require('compression');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var port = process.env.PORT || 3000;
var dbUrl = 'mongodb://localhost:27017/journal';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
app.use(express.static(__dirname + '/app'));
app.use('/feed',feedApi);

MongoClient.connect(dbUrl, function(err,db) {
    var connection = { db: db, err: err };
    if(err) {
        console.info('db connection failed ',err);
    }
    return connection;
});


app.listen(port);

console.log('Listening on port ' + port);

exports = module.exports = app;                         
