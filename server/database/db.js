/**
 * Created by ben on 7/17/15.
 */
var dbUrl = 'mongodb://localhost:27017/portfolio';
var MongoClient = require('mongodb').MongoClient;


var MongoFactory = function(cb) {
    MongoClient.connect(dbUrl, function(err,db) {
        if(!err) { cb(db) }
        else { console.error("Connection to database failed!"); }
    });
};

module.exports = {
    getInstance: MongoFactory
};