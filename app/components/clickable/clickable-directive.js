/**
 * Created by ben on 6/28/15.
 */
'use strict';

angular.module('myApp.clickable.clickable-directive', [])

.directive('a', ['$location', function($location) {
    return {
        restrict: 'E',
        link: function(scope,elem,attrs) {
            if(attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    }
}]);
