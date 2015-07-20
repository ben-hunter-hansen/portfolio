/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.feed.feed-controller',[])

.controller('FeedCtrl', ['StateSignal','Feed','$timeout',function(StateSignal,Feed, $timeout) {
    var scope = this;
    scope.getFeed = function(feedType) {
        Feed.posts(feedType).then(function(dat) {
            scope.feed = dat.data;
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

    StateSignal.listen('tabbed', function(message) {
        scope.getFeed(message.label);
    });
}]);