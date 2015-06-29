/**
 * Created by ben on 6/28/15.
 */
angular.module('myApp.landing', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'landing/landing.html',
        controller: 'LandingCtrl'
    });
}])

.controller('LandingCtrl', [function() {

}]);