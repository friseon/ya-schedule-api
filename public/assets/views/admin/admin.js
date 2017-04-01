(function () {
    'use strict';

    angular
        .module('budget')
        .config(['$routeProvider', '$locationProvider', '$stateProvider', function($routeProvider, $locationProvider, $stateProvider) {
            // $routeProvider.when('/admin', {
            //     templateUrl: 'assets/views/admin/admin.tpl.html',
            //     controller: 'adminCtrl',
            //     controllerAs: 'model'
            // });
            var admin = {
                name: 'admin',
                url: '/admin',
                controller: 'adminCtrl',
                controllerAs: 'model',
                templateUrl: 'assets/views/admin/admin.tpl.html'
            }

            $stateProvider.state(admin);

            $stateProvider.state('admin.lectors', {
                url: '?lectors',
                template: '<lector-add update="update"></lector-add><lectors-list lectors="lectors" update="update"></lectors-list>'
            })
            $stateProvider.state('admin.schools', {
                url: '?schools',
                template: '<schools schools="schools"></schools>'
            })
        }])
        .controller('adminCtrl', adminCtrl);

        adminCtrl.$inject = [
            '$scope', 'budgetService', 'adminService'
        ];

        function adminCtrl($scope, budgetService, adminService) {
        	var model = this;

            $scope.update = false;

            model.initTables = function() {
                budgetService.initTables();
            }

            model.logout = function() {
                budgetService.logout();
            }
        }

})();