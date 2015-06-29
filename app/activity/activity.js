/**
 * Created by ben on 6/28/15.
 */
angular.module('myApp.activity', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/activity', {
        templateUrl: 'activity/activity.html',
        controller: 'ActivityCtrl'
    });
}])

.controller('ActivityCtrl', [function() {

}]);