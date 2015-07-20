/**
 * Created by ben on 7/20/15.
 */
'use strict';
angular.module('myApp.landing.landing-controller',[])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'components/landing/landing.html',
        controller: 'LandingCtrl'
    });
}])
.controller('LandingCtrl', [function() {
    console.info('swag')
}]);