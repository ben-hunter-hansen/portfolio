/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.feed.feed-controller',[])

.controller('FeedCtrl', ['StateSignal','Feed','$q','$interval',function(StateSignal,Feed,$q,$interval) {
    var scope = this;
    scope.feed = [];
    scope.intervals = [];

    var feedReq = function(type,date,intervalId) {
        var d = $q.defer();
        Feed.next(type,date).then(function(resp) {
            if(!resp) {
                d.reject(resp);
            } else {
                d.resolve(resp);
            }
        }, function(er) {
            scope.intervals.pop();
            d.reject(er);
            $interval.cancel(intervalId);
        });
        return d.promise;
    };

    scope.getFeed = function(feedType,lastPostDate) {
        var respDate = lastPostDate,
            hadResponse = true;
        var intervalId = $interval(function() {
            if(hadResponse) {
                hadResponse = !hadResponse;
                feedReq(feedType,respDate,intervalId).then(function(resp) {
                    scope.feed.push(resp);
                    respDate = resp.posted_on;
                    hadResponse = true;
                }, function() { return false; });
            }
        },200);
        scope.intervals.push(intervalId);
    };

    scope.getFeed('GitHub',0);
    StateSignal.listen('tabbed', function(message) {
        scope.feed = [];
        scope.intervals.forEach(function(id) { $interval.cancel(id); });
        scope.getFeed(message.label,0);
    });
}]);