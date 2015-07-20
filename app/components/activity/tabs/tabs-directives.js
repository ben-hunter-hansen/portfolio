/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity.tabs.tabs-directives', [])

.directive('activityTabs', [function() {
    return {
        restrict: 'E',
        templateUrl: 'components/activity/tabs/tabs.html',
        scope: {},
        controller: 'TabsCtrl',
        controllerAs: 'ctrl'
    }
}])

.directive('triggerClick', ['$timeout',function($timeout) {
    return {
        restrict: 'A',
        link: function(scope,elem,attrs) {
            $timeout(function() {
                elem.triggerHandler("click");
            },0)
        }
    }
}]);