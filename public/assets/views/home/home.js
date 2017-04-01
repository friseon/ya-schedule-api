(function () {
    'use strict';

    angular
        .module('budget')
        // .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        //     $routeProvider.when('/home', {
        //         templateUrl: 'assets/views/home/home.tpl.html',
        //         controller: 'homeCtrl',
        //         controllerAs: 'model'
        //     });
        // }])
        .config(['$routeProvider', '$locationProvider', '$stateProvider', function($routeProvider, $locationProvider, $stateProvider) {
            var home = {
                name: 'home',
                url: '/home',
                controller: 'homeCtrl',
                controllerAs: 'model',
                templateUrl: 'assets/views/home/home.tpl.html'
            }
            
            $stateProvider.state(home);
        }])
        .controller('homeCtrl', homeCtrl);

        homeCtrl.$inject = [
            '$scope', 'budgetService'
        ];

        function homeCtrl($scope, budgetService) {
        	var model = this;
            
            $scope.categories = [];

            var getSchedule = function() {
                budgetService.getSchedule().then(function(data) {
                    console.log(data);
                    model.directory = data;
                });
            }

            getSchedule();
        }

})();