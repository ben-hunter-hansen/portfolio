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
}])

.directive('detectHidden', ['$timeout',function($timeout) {
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
