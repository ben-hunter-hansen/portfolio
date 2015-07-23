/**
 * Created by ben on 7/23/15.
 */

var express = require('express');

var commentValidation = function(req,res,next) {
    var _fields = ["author","photo","ref","text"];
    var invalidReqProps = Object.keys(req.body).filter(function(k) {
        return k != _fields[0] && k != _fields[1] && k != _fields[2] && k != _fields[3];
    });
    var checkReq = _fields.filter(function(f) {
        return req.body.hasOwnProperty(f) && req.body[f].length;
    });

    if((checkReq.length !== _fields.length) || invalidReqProps.length) {
        res.status(422).send({msg: "Missing or invalid request parameter(s)", required: _fields});
    } else {
        _fields.map(function(f) {
            req.body[f] = req.sanitize(req.body[f]);
        });
        next();
    }
};

module.exports = {
    commentValidator: commentValidation
};