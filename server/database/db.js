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

var _updateDocument = function(col,field,predict, data, done) {
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

var update = function(collection,field) {
    return function(predict, data, done) {
        MongoClient.connect(dbUrl, _updateDocument(collection,field,predict,data,done));
    }
};

var createPlaceholders = function(collection) {
    var _defaultPhotos = {
        "Facebook": "assets/img/fb_icon.png",
        "GitHub": "assets/img/github_icon.png",
        "LinkedIn": "assets/img/linkedin_icon.png",
        "Twitter": "assets/img/twitter_icon.png"
    };

    var _postText = "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo," +
        "chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.";
    var types = ['GitHub','Facebook','LinkedIn','Twitter'];
    var posts = [];
    for(var i = 0; i < types.length; i++) {
        var typeCount = Math.floor((Math.random() * 5) + 1);
        for(var j = 0; j < typeCount; j++) {
            var post = {
                type: types[i],
                title: "@benhansen on " + types[i],
                photo: _defaultPhotos[types[i]],
                body: _postText,
                points: Math.floor((Math.random() * 100) + 1),
                posted_on: (Date.now() - Math.floor((Math.random() * (60 * 60 * 12) +1))),
                comments: []
            };
            posts.push(post);
        }
    }
    MongoClient.connect(dbUrl, function(err,db) {
        var col = db.collection('posts');
        col.insert(posts, function(err,doc) {
            err ? console.info(err) : console.info("post inserted successfully");
        });
    });
};
module.exports = {
    api: {
        posts: {
            insert: insert("posts"),
            all: all("posts")
        },
        comments: {
            update: update("posts","comments")
        }
    },
    init: createPlaceholders
};