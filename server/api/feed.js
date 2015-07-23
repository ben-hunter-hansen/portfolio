/**
 * Created by ben on 7/17/15.
 */
var express = require('express'),
    db = require('../database/db'),
    models = require('../models/models'),
    ObjectId = require('mongodb').ObjectID,
    validaton = require('../middleware/validation'),
    router = express.Router();

router.post('/comments', validaton.commentValidator, models.comment ,function(req,res) {
    res.status(200).json(req.body);
});

router.post('/posts', function(req,res) {
    db.api.posts.insert(req.body, function(err, doc) {
        !err ? res.send(doc) : res.status(500).send("Something went horribly wrong.");
    });
});

router.get('/posts', function(req,res) {
   db.api.posts.all({type: req.query.type}, function(err,posts) {
       !err ? res.send(posts) : res.status(500).send("Something went horribly wrong.");
   });
});

module.exports = router;