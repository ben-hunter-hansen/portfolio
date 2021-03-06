'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'mm.foundation',
    'myApp.landing',
    'myApp.activity',
    'myApp.projects',
    'myApp.shared'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/welcome'});
}]);
