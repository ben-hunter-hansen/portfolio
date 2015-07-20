/**
 * Created by ben on 6/29/15.
 */
angular.module('myApp.projects', [
    'myApp.projects.projects-directives'
])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/projects', {
        templateUrl: 'components/projects/templates/projects.html'
    });
}]);

