/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.feed.feed-controller',[])

.controller('FeedCtrl', ['StateSignal','Feed','$interval',function(StateSignal,Feed, $interval) {
    var scope = this;
    scope.feed = [];
    scope.stop;
    scope.getFeed = function(feedType) {
        var step = function(posts) {
            return function() {
                scope.feed.push(posts.pop());
            }
        };
        Feed.posts(feedType).then(function(dat) {
            var posts = dat.data;
            scope.stop = $interval(step(posts),100,posts.length);
        });
    };

    var _toggledReplyId = 0;
    scope.getToggledReply = function(id) {
        return id === _toggledReplyId;
    };
    scope.setToggledReply = function(id) {
        _toggledReplyId = _toggledReplyId !== id ? id : 0;
    };
    scope.submitReply = function(commentText, post) {
        if(commentText) {
            Feed.submitReply({text: commentText, postId: post._id, type: post.type})
                .then(function(resp) {
                    post.comments.unshift(Feed.comment(commentText,post.type));
                    post.replyModel.text = "";
                    scope.setToggledReply(0);
                })
                .catch(function(err) {  console.error(err); });
        }
    };
    scope.isLoading = function() {
        return loadStatus;
    };
    StateSignal.listen('tabbed', function(message) {
        if(angular.isDefined(scope.stop)) {
            scope.feed = [];
            $interval.cancel(stop);
        }
        scope.getFeed(message.label);
    });
}]);