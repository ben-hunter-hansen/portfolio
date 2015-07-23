/**
 * Created by ben on 7/23/15.
 */
var express = require('express'),
    db = require('../database/db'),
    ObjectId = require('mongodb').ObjectID;


var postComment = function(req,res,next) {
    db.api.comments.update({_id: new ObjectId(req.body.ref)}, req.body, function(err) {
        err ? res.status(500).send("Something went horribly wrong") : next();
    });
};

module.exports = {
    comment: postComment
};