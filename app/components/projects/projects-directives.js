/**
 * Created by ben on 7/20/15.
 */

angular.module('myApp.projects.projects-directives',[])

.directive('project', [function() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'components/projects/templates/project.html',
        controller: function() {},
        link: function(scope,elem,attrs) {}
    }
}]);