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
}])


.directive('showLoading', ['$timeout',function($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'components/shared/templates/show-loading.html',
        link: function(scope,elem,attrs) {
            scope.cap = attrs.cap;
            scope.current = attrs.current;
            scope.center = attrs.center;
            scope.width = attrs.width ? attrs.width : '100%';
            if(attrs.vheight && parseInt(attrs.vheight) >= 0 && parseInt(attrs.vheight) <= 100) {
                scope.vheight = attrs.vheight + 'vh';
            } else {
                scope.vheight = 'auto';
            }
            scope.percentage = function(step,max) {
                return Math.floor((step / max) * 100);
            };
        }
    }
}]);
