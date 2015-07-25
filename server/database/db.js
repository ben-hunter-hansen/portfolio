/**
 * Created by ben on 7/17/15.
 */
var dbUrl = 'mongodb://localhost:27017/portfolio';
var MongoClient = require('mongodb').MongoClient;

var _addDocument = function(col, document, done) {
    return function(err,db) {
        if(err) return done(err,null);
        var collection = db.collection(col);
        collection.insert(document, done);
    }
};

var _updateDocument = function(col,query,data,done) {
    return function(err,db) {
        if(err) return done(err,null);
        var collection = db.collection(col);
        collection.update(query,{$set: data},done);
    }
};

var _updateDocumentField = function(col,field,predict, data, done) {
    return function(err,db) {
        if(err) return done(err,null);
        var collection = db.collection(col);
        var fieldObj = {};
        fieldObj[field] = data; 
        collection.update(predict, {$addToSet: fieldObj}, done);
    }
};

var _getDocuments = function(col, predict, done) {
    return function(err,db) {
        if(err) return done(err,null);
        var collection = db.collection(col).find(predict);
        collection.toArray(done);
    }
};

var insert = function(collection) {
    return function(doc, done) {
        MongoClient.connect(dbUrl, _addDocument(collection,doc,done));
    }
};

var all = function(collection) {
    return function(predict, done) {
        MongoClient.connect(dbUrl, _getDocuments(collection,predict,done));
    }
};

var updateDoc = function(collection) {
    return function(query, doc, done) {
        MongoClient.connect(dbUrl, _updateDocument(collection,query,doc,done));
    }
};

var updateField = function(collection,field) {
    return function(predict, data, done) {
        MongoClient.connect(dbUrl, _updateDocumentField(collection,field,predict,data,done));
    }
};

module.exports = {
    api: {
        posts: {
            insert: insert("posts"),
            all: all("posts"),
            update: updateDoc("posts")
        },
        comments: {
            update: updateField("posts","comments")
        }
    }
};