var express = require('express');
var compression = require('compression');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var port = process.env.PORT || 3000;
var dbUrl = 'mongodb://localhost:27017/journal';

app.use(compression());
app.use(express.static(__dirname + '/app'));

MongoClient.connect(dbUrl, function(err,db) {
    var connection = { db: db, err: err };
    if(!err) {
        console.info('we got a connection')
    } else {
        console.info('shit',err);
    }
    return connection;
});


app.listen(port);

console.log('Listening on port ' + port);

exports = module.exports = app;                         
