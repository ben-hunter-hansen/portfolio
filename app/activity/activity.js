/**
 * Created by ben on 6/28/15.
 */
angular.module('myApp.activity', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/activity', {
            templateUrl: 'activity/activity.html',
            controller: 'ActivityCtrl'
        });
    }])

    .controller('ActivityCtrl', ['$scope', 'Feed', '$timeout','$http', function ($scope, Feed, $timeout,$http) {
        $scope.feed = [];
        $scope.feedOption = {
            github: { index: 0, display: 'GitHub' },
            facebook: { index: 1, display: 'Facebook' },
            linkedin: { index: 2, display: 'LinkedIn' },
            twitter: { index: 3, display: 'Twitter' },
        };
        $scope.focusIndex = 0;

        var _toggledReplyId = 0;
        $scope.getToggledReply = function(id) {
            return id === _toggledReplyId;
        };
        $scope.setToggledReply = function(id) {
            _toggledReplyId = _toggledReplyId !== id ? id : 0;
        };
        $scope.submitReply = function(commentText, post) {
            if(commentText) {
                Feed.submitReply({text: commentText, postId: post._id, type: post.type})
                    .then(function(resp) {
                        post.comments.unshift(Feed.comment(commentText,post.type));
                        post.replyModel.text = "";
                        $scope.setToggledReply(0);
                    })
                    .catch(function(err) {  console.error(err); });
            }
        };

        $scope.getFeed = function(option) {
            $scope.focusIndex = option.index;
            Feed.posts(option.display).then(function(dat) {
                $scope.feed = dat.data;
            });
        };

        // Using a timeout to break out of current $apply cycle,
        // simulate click on github feed
        $timeout(function() {
            angular.element(document.querySelector('#gitFeed')).triggerHandler('click');
        },0);
    }]);