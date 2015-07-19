/**
 * Created by ben on 7/17/15.
 */
var express = require('express'),
    db = require('../db'),
    ObjectId = require('mongodb').ObjectID,
    router = express.Router();

router.post('/comments', function(req,res) {
    db.api.comments.update({_id: new ObjectId(req.body.ref)},req.body, function(err,comments) {
        console.info(err);
        if(!err) {
            res.status(200).json(comments);
        } else {
            res.sendStatus(500);
        }
    });
});

router.post('/posts', function(req,res) {
    db.api.posts.insert(req.body, function(err, doc) {
        !err ? res.send(doc) : res.status(500).send('Post insert failed');
    });
});

router.get('/posts', function(req,res) {
   db.api.posts.all({type: req.query.type}, function(err,posts) {
       res.send(posts);
   });
});

module.exports = router;