(function () {
    'use strict';

    angular
        .module('budget')
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.when('/admin', {
                templateUrl: 'assets/views/admin/admin.tpl.html',
                controller: 'adminCtrl',
                controllerAs: 'model'
            });
        }])
        .controller('adminCtrl', adminCtrl);

        adminCtrl.$inject = [
            '$scope', 'budgetService', 'adminService'
        ];

        function adminCtrl($scope, budgetService, adminService) {
        	var model = this;

            model.initTables = function() {
                budgetService.initTables();
            }

            model.logout = function() {
                budgetService.logout();
            }
        }

})();