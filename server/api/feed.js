/**
 * Created by ben on 7/17/15.
 */

// Dependencies
var express = require('express'),
    db = require('../database/db'),
    router = express.Router();

// Models
var Comment = require('../models/comment'),
    Post = require('../models/post');

// Route specific middleware
var validation = require('../middleware/validation');


router.post('/comments/new', validation.comment, function(req,res) {
    var comment = new Comment(req.body);
    comment.add().then(function(result) {
        res.status(result.status()).send(result.data());
    });
});

router.post('/posts/new',function(req,res) {
    var post = new Post(req.body);
    post.add().then(function(result) {
        res.status(result.status()).send(result.data());
    });
});

router.put('/posts/vote', validation.post, function(req,res) {
    var post = new Post(req.body);
    post.vote().then(function(result) {
        res.status(result.status()).send(result.data());
    });
});

router.get('/posts', function(req,res) {
   Post.findByType(req.query.type).then(function(result) {
       res.status(result.status()).send(result.data());
   });
});

router.get('/posts/next',function(req,res) {
    Post.getNext(req.query.type,req.query.last).then(function(result) {
        res.status(result.status()).send(result.data());
    });
});

module.exports = router;