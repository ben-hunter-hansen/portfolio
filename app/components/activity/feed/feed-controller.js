/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.feed.feed-controller',[])

.controller('FeedCtrl', ['StateSignal','Feed',function(StateSignal,Feed) {
    var scope = this;
    scope.feed = [];

    var onSuccess = function() {
        // Implement this as needed
    };

    var onNotify = function(data) {
        scope.feed.push(data);
    };

    var onError = function(err) {
        console.error(err);
    };

    Feed.loadAsync('GitHub',0)
        .then(onSuccess,onError,onNotify);

    StateSignal.listen('tabbed', function(message) {
        scope.feed = [];
        Feed.loadAsync(message.label,0)
            .then(onSuccess,onError,onNotify);
    });
}]);