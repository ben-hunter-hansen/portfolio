/**
 * Created by ben on 7/23/15.
 */

var express = require('express'),
    Comment = require('../models/comment'),
    Post = require('../models/post');


var ModelValidator = function(modelFields) {
    return function(req,res,next) {
        function checkField(obj) {
            return function(key) {
                return modelFields.some(function(fk) { return fk === key }) && (obj[key] !== null);
            }
        }
        var isRequestBodyValid = Object.keys(req.body).every(checkField(req.body));
        if(isRequestBodyValid) {
            modelFields.map(function(f) { req.body[f] = req.sanitize(req.body[f]); });
            next();
        } else {
            res.status(422).send({msg: "Missing or invalid request parameter(s)", required: modelFields });
        }
    }
};

module.exports = {
    comment: ModelValidator(Comment.Fields),
    post: ModelValidator(Post.Fields)
};