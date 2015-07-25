/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.feed.feed-controller',[])

.controller('FeedCtrl', ['StateSignal','Feed','$interval',function(StateSignal,Feed, $interval) {
    var scope = this;
    scope.feed = [];

    scope.stopFeed;
    scope.getFeed = function(feedType) {
        var step = function(posts) {
            return function() {
                scope.feed.push(posts.pop());
            }
        };
        Feed.posts(feedType).then(function(dat) {
            if(angular.isDefined(scope.stopFeed)) {
                $interval.cancel(scope.stopFeed);
            }
            var posts = dat.data;
            scope.stopFeed = $interval(step(posts),100,posts.length);
            scope.loadComplete = true;
        });
    };

    scope.getFeed('GitHub');
    StateSignal.listen('tabbed', function(message) {
        if(angular.isDefined(scope.stopFeed)) {
            scope.feed = [];
            $interval.cancel(scope.stopFeed);
        }
        scope.getFeed(message.label);
    });
}]);