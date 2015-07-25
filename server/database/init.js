/**
 * Created by ben on 7/25/15.
 */

var dbUrl = 'mongodb://localhost:27017/portfolio';
var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;

var init = function() {
    var _defaultPhotos = {
        "Facebook": "assets/img/fb_icon.png",
        "GitHub": "assets/img/github_icon.png",
        "LinkedIn": "assets/img/linkedin_icon.png",
        "Twitter": "assets/img/twitter_icon.png"
    };

    var _postText = "Love to play with owner's hair tie spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce." +
        "All of a sudden cat goes crazy climb leg roll on the floor." + "Poop in litter box, scratch the walls lick butt throwup on your pillow, but jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed yet make muffins.";

    var types = ['GitHub','Facebook','LinkedIn','Twitter'];
    var posts = [];
    for(var i = 0; i < types.length; i++) {
        var typeCount = Math.floor((Math.random() * 7) + 1);
        for(var j = 0; j < typeCount; j++) {
            var postId = ObjectId();
            var post = {
                _id: postId,
                type: types[i],
                title: "@benhansen on " + types[i],
                photo: _defaultPhotos[types[i]],
                body: _postText,
                points: Math.floor((Math.random() * 100) + 1),
                posted_on: (Date.now() - Math.floor((Math.random() * (60 * 60 * 12) +1))),
                comments: [{
                    author: "ben-hunter-hansen",
                    photo: "assets/img/github_icon.png",
                    ref: postId,
                    text: "Peer out window, chatter at birds, lure them to mouth. Play riveting piece on synthesizer keyboard peer out window, chatter at birds, lure them to mouth attack feet, or why must they do that, or shake treat bag, but hiss at vacuum cleaner. "
                }]
            };
            posts.push(post);
        }
    }
    MongoClient.connect(dbUrl, function(err,db) {
        var col = db.collection('posts');
        col.remove();
        col.insert(posts, function(err,doc) {
            if(err) {
                console.error(err);
            } else {
                console.info("posts added successfully: ",doc.ops.length);
                process.exit();
            }
        });
    });
};

init();