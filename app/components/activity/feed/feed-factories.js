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

    return {
        comment: function(data,type) {
            return { photo: _defaultPhotos[type.toLowerCase()], text: data.comment, author: data.author };
        },
        posts: function(type) {
            return $http.get(_apiUrl.posts+"?type="+type);
        },
        submitReply: function(reply) {
            var payload = { text: reply.text, ref: reply.postId, photo: _defaultPhotos[reply.type.toLowerCase()], author: reply.author  };
            return $http.post(_apiUrl.comments, payload);
        }
    }
}]);