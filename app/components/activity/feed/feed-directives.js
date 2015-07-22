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
            var _toggledReplyId = 0;
            scope.getToggledReply = function(id) {
                return id === _toggledReplyId;
            };
            scope.setToggledReply = function(id) {
                _toggledReplyId = _toggledReplyId !== id ? id : 0;
            };
            scope.parseDate = function(mills) {
                return new Date(mills).toString();
            };
        }
    }
}])

.directive('postInfo', [function() {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/post-info.html',
        scope: {
            clickEvent: '&onReplyClicked',
            post: '=postDetails'
        },
        link: function(scope,elem,attrs) {
            scope.shouldDisplay = true;
            scope.click = function() {
                scope.clickEvent();
                scope.shouldDisplay = false;
            };
        }
    }
}])
.directive('replyForm',['Feed',function(Feed) {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/reply-form.html',
        scope: {
            show: '=show',
            closeEvent: '&onClose',
            post: '=replyTo'
        },
        link: function(scope,elems,attrs) {
            scope.formData = { comment: ""};
            scope.cancel = function() {
                scope.shouldDisplay = false;
                scope.closeEvent();
            };
            scope.submit = function(data) {
                Feed.submitReply({text: scope.formData.comment,
                    postId: scope.post._id, type: scope.post.type})
                    .then(function(resp) {
                        scope.post.comments.unshift(Feed.comment(scope.formData.comment,scope.post.type));
                        scope.formData.comment = "";
                        scope.cancel();
                    }).catch(function(err) {  console.error(err); });
            };
            scope.$watch('show', function(newVal) {
                scope.shouldDisplay = newVal;
            })
        }
    }
}])

.directive('comment', [function() {
    return {
        restrict: 'EA',
        templateUrl: 'components/activity/feed/templates/comment.html',
        scope: {
            comment: '=commentData',
            isOpen: '=isOpen'
        },
        link: function(scope,elem,attrs) {
            scope.shouldDisplay = false;
            scope.$watch('isOpen', function(newVal) {
                console.info(newVal);
                scope.shouldDisplay = newVal;
            });
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