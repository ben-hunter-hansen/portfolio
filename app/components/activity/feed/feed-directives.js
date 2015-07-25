/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.feed.feed-directives', [])

.directive('activityFeed', [function() {
    return {
        restrict: 'E',
        templateUrl: 'components/activity/feed/feed.html',
        scope: {},
        controller: 'FeedCtrl',
        controllerAs: 'ctrl',
        link: function(scope,elem,attrs) {
            var toggleId = { reply: 0, comments: 0 };
            scope.getToggled = function(id,which) {
                return id === toggleId[which];
            };
            scope.setToggled = function(id,which) {
                console.info(id,which)
                toggleId[which] = id;
            };
            scope.parseDate = function(millis) {
                var d = new Date(millis),
                    dateStr = d.toLocaleDateString(),
                    timeStr = d.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

                return dateStr + " @ " + timeStr;
            };
        }
    }
}])

.directive('postInfo', ['StateSignal',function(StateSignal) {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/post-info.html',
        scope: {
            post: '=postDetails',
        },
        link: function(scope,elem,attrs) {
            scope.commentVisible = false;
            scope.replyVisible = false;

            scope.clear = function(which) {
                switch(which) {
                    case 'comment': scope.commentVisible = false; break;
                    case 'reply': scope.replyVisible = false; break;
                    default: scope.commentVisible = scope.replyVisible = false;
                }
            };

            StateSignal.listen('feed.posts.toggle', function(target) {
                if(target.id !== scope.post._id) {
                    scope.clear();
                }
            });

            scope.replyClick = function() {
                StateSignal.transmit('feed.posts.toggle', {action: 'reply',id: scope.post._id});
                scope.replyVisible = !scope.replyVisible;
                scope.clear('comment');
            };

            scope.commentClick = function() {
                StateSignal.transmit('feed.posts.toggle', {action: 'comment',id: scope.post._id});
                scope.commentVisible = !scope.commentVisible;
                scope.clear('reply');
            }
        }
    }
}])
.directive('commentArea', ['StateSignal',function(StateSignal) {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/comment-area.html',
        scope: {
            comments: '=referTo',
            postId: '=postId'
        },
        link: function(scope,elem,attrs) {
            scope.shouldDiplay = false;

            StateSignal.listen('feed.posts.toggle', function(target) {
                if(target.action !== 'comment') { // This message doesn't apply here, ensure we are disabled
                    scope.shouldDisplay = false;
                } else if(target.id === scope.postId && target.action === 'comment') {
                    scope.shouldDisplay = !scope.shouldDisplay;
                } else {
                    scope.shouldDisplay = false;
                }
            });
            scope.cancel = function() {
                scope.shouldDisplay = !scope.shouldDisplay;
            };
        }
    }
}])
.directive('replyForm',['Feed','StateSignal',function(Feed,StateSignal) {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/reply-form.html',
        scope: {
            post: '=replyTo'
        },
        link: function(scope,elems,attrs) {
            scope.formData = { comment: "", author: ""};
            scope.shouldDisplay = false;
            scope.cancel = function() {
                scope.shouldDisplay = !scope.shouldDisplay;
            };
            scope.submit = function(data) {
                Feed.submitReply({text: scope.formData.comment,
                    postId: scope.post._id, type: scope.post.type, author: scope.formData.author})
                    .then(function(resp) {
                        scope.post.comments.push(resp.data);
                        scope.formData.comment = "";
                        scope.cancel();
                    }).catch(function(err) {  console.error(err); });
            };
            StateSignal.listen('feed.posts.toggle', function(target) {
                if(target.action !== 'reply') { // This message doesn't apply here, ensure we are disabled
                    scope.shouldDisplay = false;
                } else if(target.id === scope.post._id && target.action === 'reply') {
                    scope.shouldDisplay = !scope.shouldDisplay;
                } else {
                    scope.shouldDisplay = false;
                }
            });
        }
    }
}])

.directive('comment', [function() {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/comment.html',
        scope: {
            comment: '=commentData'
        },
        link: function(scope,elem,attrs) {

        }
    }
}])
/**
 *  Gives the currently toggled element some time to
 *  hide before displaying the target element.
 */
.directive('toggleAnon', ['$timeout',function($timeout) {
    return {
        restrict: 'A',
        link: function(scope,elem,attrs) {
            scope.$watch('anon', function() {
                elem.css('display','none');
                $timeout(function(){
                    elem.css('display','inline');
                },300);
            })
        }
    }
}]);