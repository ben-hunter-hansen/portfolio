/**
 * Created by ben on 6/28/15.
 */

angular.module('myApp.activity.feed.feed-factories', [])

.factory('Feed',['$http', function($http) {

    var _apiUrl = {
        comments: '/feed/comments',
        posts: '/feed/posts'
    };

    var _defaultPhotos = {
        facebook: "assets/img/fb_icon.png",
        github: "assets/img/github_icon.png",
        linkedin: "assets/img/linkedin_icon.png",
        twitter: "assets/img/twitter_icon.png"
    };

    var _commentText = "Bacon ipsum dolor sit amet nulla ham qui sint exercitation " +
        "eiusmod commodo, chuck duis velit. Aute in reprehenderit";

    var _postText = "Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo," +
        "chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong.";

    var _randomId = function() {
        var timeStamp = Date.now(),
            prefix = String.fromCharCode(65 + Math.floor((Math.random() * 25) + 1));
        return prefix + timeStamp;
    };

    return {
        comment: function(text,type) {
            return { photo: _defaultPhotos[type.toLowerCase()], text: text };
        },
        posts: function(type) {
            return $http.get(_apiUrl.posts+"?type="+type);
        },
        placeholder: function(comments,type) {
            var photo = _defaultPhotos[type.toLowerCase()];

            var post = {
                id: _randomId(),
                type: type,
                title: "@benhansen on " + type,
                photo: photo,
                body: _postText,
                points: Math.floor((Math.random() * 100) + 1),
                hours_ago: Math.floor((Math.random() * 5) + 1),
                comments: []
            };

            for(var i = 0; i < comments; i++) {
                post.comments.push(this.comment(_commentText,type));
            }
            return post;
        },
        submitReply: function(reply) {
            var payload = { text: reply.text, ref: reply.postId, photo: _defaultPhotos[reply.type.toLowerCase()]  };
            return $http.post(_apiUrl.comments, payload);
        }
    }
}]);