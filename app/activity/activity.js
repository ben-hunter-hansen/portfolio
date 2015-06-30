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

    .controller('ActivityCtrl', ['$scope', 'Feed', function ($scope, Feed) {
        $scope.feed = [];

        $scope.getFeed = function(type) {
            var randPosts = Math.floor((Math.random() * 10) + 1);
            $scope.feed = [];
            for(var i = 0; i < randPosts; i++) {
                var randCommnents = Math.floor((Math.random() * 5) + 1);
                $scope.feed.push(Feed.placeholder(randCommnents,type));
            }
        };

        $scope.getFeed('github');
    }]);