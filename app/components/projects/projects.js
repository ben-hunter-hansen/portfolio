/**
 * Created by ben on 6/29/15.
 */
angular.module('myApp.projects', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'components/projects/projects.html',
            controller: 'ProjectsCtrl'
        });
    }])

    .controller('ProjectsCtrl', ['$scope',function ($scope) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;
        $scope.maxSize = 5;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.onPaged = function(pageNo) {

        }
    }]);