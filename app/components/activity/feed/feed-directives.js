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
            //scope.$apply();
        }
    }
}])

.directive('checkUpdate', ['Feed',function(Feed) {
    return {
        restrict: 'A',
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