/**
 * Created by ben on 7/23/15.
 */
var express = require('express'),
    db = require('../database/db'),
    ObjectId = require('mongodb').ObjectID;


var Comment = function(data) {
    this._author = data.author;
    this._photo = data.photo;
    this._ref = data.ref;
    this._text = data.text;
};

// Static/final members
Comment.FIELDS = ["author","photo","ref","text"];

// Instance members
Comment.prototype.json = function() {
    return {
        author: this._author,
        photo: this._photo,
        ref: this._ref,
        text: this._text
    };
};

Comment.prototype.add = function() {
    var predict = {_id: new ObjectId(this._ref)},
        document = this.json();
    return new Promise(function(resolve) {
        db.api.comments.update(predict, document, function(err) {
            resolve({
                status: err ? 500 : 200,
                data: err ? { error: "Something went horribly wrong." } : document
            });
        });
    });
};



module.exports = Comment;