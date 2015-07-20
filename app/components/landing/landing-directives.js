/**
 * Created by ben on 7/20/15.
 */
'use strict';
angular.module('myApp.landing.landing-directives',[])

.directive('contentSection', [function() {
    return {
        restrict: 'EA',
        scope: {
            photo: '@photo',
            title: '@title'
        },
        templateUrl: 'components/landing/templates/content-section.html',
        link: function(scope, elem, attrs) {}
    }
}])

.directive('hero', [function() {
    return {
        restrict: 'EA',
        scope: {
            title: '@title'
        },
        templateUrl: 'components/landing/templates/hero.html',
        link: function(scope, elem, attrs) {}
    }
}]);