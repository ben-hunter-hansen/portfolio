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

    .controller('ActivityCtrl', ['$scope', 'Feed', '$timeout', function ($scope, Feed, $timeout) {
        $scope.feed = [];
        $scope.feedOption = {
            github: { index: 0, display: 'GitHub' },
            facebook: { index: 1, display: 'Facebook' },
            linkedin: { index: 2, display: 'LinkedIn' },
            twitter: { index: 3, display: 'Twitter' },
        };
        $scope.focusIndex = 0;

        $scope.getFeed = function(option) {
            $scope.focusIndex = option.index;
            var randPosts = Math.floor((Math.random() * 10) + 1);
            $scope.feed = [];
            for(var i = 0; i < randPosts; i++) {
                var randCommnents = Math.floor((Math.random() * 5) + 1);
                $scope.feed.push(Feed.placeholder(randCommnents,option.display));
            }
        };



        // Using a timeout to break out of current $apply cycle,
        // simulate click on github feed
        $timeout(function() {
            angular.element(document.querySelector('#gitFeed')).triggerHandler('click');
        },0);
    }]);