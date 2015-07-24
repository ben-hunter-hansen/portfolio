/**
 * Created by ben on 7/24/15.
 */
var express = require('express'),
    db = require('../database/db'),
    ObjectId = require('mongodb').ObjectID;


var Post = function(data) {
    this._id = data._id;
    this._title = data.title;
    this._body = data.body;
    this._photo = data.photo;
    this._points = data.points;
    this._type = data.type;
    this._posted_on = data.posted_on;
    this._comments = data.comments;
};

// Static/final members
Post.FIELDS = ["_id","title","body","photo","points","type","posted_on","comments"];
Post.findByType = function(postType) {
    return new Promise(function(resolve) {
        db.api.posts.all({type: postType}, function(err,posts) {
            resolve({
                status: err ? 500 : 200,
                data: err ? { error: "Something went horribly wrong." } : posts
            });
        });
    });
};

// Instance members
Post.prototype.json = function() {
    var obj = {
        title: this._title,
        body: this._body,
        photo: this._photo,
        points: this._points,
        type: this._type,
        posted_on: this._posted_on,
        comments: this._comments
    };
    this._id ? obj["_id"] = this._id : 0;
    return obj;
};

Post.prototype.add = function() {
    return new Promise(function(resolve) {
        db.api.posts.insert(this.json(), function(err, doc) {
            resolve({
                status: err ? 500 : 200,
                data: err ? { error: "Something went horribly wrong." } : doc
            });
        });
    })
};

module.exports = Post;