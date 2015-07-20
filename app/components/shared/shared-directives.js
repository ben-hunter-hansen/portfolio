/**
 * Created by ben on 6/28/15.
 */
'use strict';

angular.module('myApp.shared.shared-directives', [])

.directive('a', [ function() {
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

.directive('viewTitle', ['$location',function($location) {
    return {
        restrict: 'A',
        link: function(scope,elem) {
            scope.$on('$routeChangeSuccess', function() {
                var views = [
                    {name: 'welcome', label: 'Benjamin Hansen'},
                    {name: 'activity', label: 'Recent Activity'},
                    {name: 'projects', label: 'Projects'}
                ];
                views.map(function(view) {
                    $location.absUrl().indexOf(view.name) > -1 ? elem.text(view.label) : 0;
                });
            });
        }
    }
}]);
