/**
 * Created by ben on 7/24/15.
 */
var express = require('express'),
    Mongo = require('../database/db'),
    Result = require('./result');

var ObjectId = require('mongodb').ObjectID;

var Post = function(data) {
    this._postObject = data;
};

// Static/final members
Post.Fields = ["_id","title","body","photo","points","type","posted_on","comments"];

Post.findByType = function(postType) {
    return new Promise(function(resolve) {
        Mongo.getInstance(function(db) {
            var posts = db.collection("posts").find({type:postType});
            posts.toArray(function(err,docs) {
                db.close();
                resolve(new Result(err,docs));
            });
        });
    });
};

Post.getNext = function(type,last) {
    return new Promise(function(resolve) {
        Mongo.getInstance(function(db) {
            var posts = db.collection("posts");
            posts.findOne({
                type: type,
                posted_on: { $gt: parseInt(last) }
            },{ "sort": { "posted_on": 1 } }, function(err,doc) {
                db.close();
                resolve(new Result(err,doc));
            });
        });
    });
};

// Instance members
Post.prototype.json = function() {
    var obj = this._postObject;
    obj.hasOwnProperty("_id") ? obj["_id"] = this._id : 0;
    return obj;
};

Post.prototype.get = function(k) {
    if(this._postObject.hasOwnProperty(k)) {
        return this._postObject[k];
    } else throw new TypeError("Invalid argument k", "post.js", 36);
};

Post.prototype.id = function() {
    return new ObjectId(this._postObject["_id"]);
};

Post.prototype.add = function() {
    var that = this;
    return new Promise(function(resolve) {
        Mongo.getInstance(function(db) {
           var posts = db.collection("posts");
            posts.insert(that.json(), function(err,doc) {
                db.close();
                resolve(new Result(err,doc));
            });
        });
    });
};

Post.prototype.vote = function() {
    var that = this;
    return new Promise(function(resolve) {
        var oneUp = parseInt(that.get("points")) + 1;
        that.update({
            points: oneUp
        }).then(function(result) {
            resolve(result);
        });
    });
};

Post.prototype.update = function(data) {
    var that = this;
    return new Promise(function(resolve) {
        Mongo.getInstance(function(db) {
            var posts = db.collection("posts");
            posts.update({ _id: that.id()},{$set: data}, function(err,doc) {
                db.close();
                resolve(new Result(err,data));
            });
        });
    });
};

module.exports = Post;