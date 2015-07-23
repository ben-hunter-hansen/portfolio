/**
 * Created by ben on 7/19/15.
 */
'use strict';

angular.module('myApp.activity', [
    'myApp.activity.tabs',
    'myApp.activity.feed',
])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/activity', {
        templateUrl: 'components/activity/activity.html'
    });
}]);