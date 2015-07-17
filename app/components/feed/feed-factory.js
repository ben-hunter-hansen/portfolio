/**
 * Created by ben on 6/28/15.
 */

angular.module('myApp.feed.activity-factory', [])

.factory('Feed', function() {
    var _defaultPhotos= {
        facebook: "assets/img/fb_icon.png",
        github: "assets/img/github_icon.png",
        linkedin: "assets/img/linkedin_icon.png",
        twitter: "assets/img/twitter_icon.png"
    };

    var _commentText = "Bacon ipsum dolor sit amet nulla ham qui sint exercitation " +
        "eiusmod commodo, chuck duis velit. Aute in reprehenderit";

    var _postText = "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo," +
        "chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.";

    return {
        placeholder: function(comments,type) {
            var photo = _defaultPhotos[type.toLowerCase()];

            var post = {
                title: "@benhansen on " + type,photo: photo,
                body: _postText,
                comments: []
            };

            for(var i = 0; i < comments; i++) {
                post.comments.push({
                    photo: _defaultPhotos[type.toLowerCase()],
                    body: _commentText
                });
            }
            return post;
        }
    }
});