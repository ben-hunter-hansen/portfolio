/**
 * Created by ben on 6/28/15.
 */

angular.module('myApp.activity.feed.feed-factories', [])

.factory('Feed',['$http','$q', function($http,$q) {

    var _api = {
        comments: {
            add: "/feed/comments/new"
        },
        posts: {
            byType: "/feed/posts?type=",
            vote: "/feed/posts/vote",
            next: "/feed/posts/next?type="
        }
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
            return $http.get(_api.posts.byType+type);
        },
        next: function(type,last) {
            var deferred = $q.defer();
            $http.get(_api.posts.next+type+"&last="+last).then(function(resp) {
                deferred.resolve(resp.data);
            },function(err) { deferred.reject(err) });
            return deferred.promise;
        },
        vote: function(data) {
            return $http.put(_api.posts.vote, data);
        },
        submitReply: function(reply) {
            var payload = { text: reply.text, ref: reply.postId, photo: _defaultPhotos[reply.type.toLowerCase()], author: reply.author  };
            return $http.post(_api.comments.add, payload);
        }
    }
}]);