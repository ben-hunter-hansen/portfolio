/**
 * Created by ben on 7/17/15.
 */

// Dependencies
var express = require('express'),
    db = require('../database/db'),
    validaton = require('../middleware/validation'),
    router = express.Router();

// Models
var Comment = require('../models/comment'),
    Post = require('../models/post');

router.post('/comments', validaton.comment, function(req,res) {
    var comment = new Comment(req.body);
    comment.add().then(function(result) {
        res.status(result.status).send(result.data);
    });
});

router.post('/posts', function(req,res) {
    var post = new Post(req.body);
    post.add().then(function(result) {
        res.send(result.status).send(result.data);
    });
});

router.get('/posts', function(req,res) {
   Post.findByType(req.query.type).then(function(result) {
       res.status(result.status).send(result.data);
   })
});

module.exports = router;