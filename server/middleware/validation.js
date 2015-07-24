/**
 * Created by ben on 7/23/15.
 */

var express = require('express'),
    Comment = require('../models/comment');

var CommentValidator = function(req,res,next) {
    function checkField(obj) {
        return function(key) {
            return Comment.FIELDS.some(function(fk) { return fk === key }) && obj[key].length;
        }
    }
    var isRequestBodyValid = Object.keys(req.body).every(checkField(req.body));

    if(isRequestBodyValid) {
        Comment.FIELDS.map(function(f) { req.body[f] = req.sanitize(req.body[f]); });
        next();
    } else {
        res.status(422).send({msg: "Missing or invalid request parameter(s)", required: Comment.FIELDS });
    }
};

module.exports = {
    comment: CommentValidator
};