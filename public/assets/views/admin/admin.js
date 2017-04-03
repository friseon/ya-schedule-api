(function () {
    'use strict';

    angular
        .module('schedule')
        .config(['$stateProvider', function($stateProvider) {
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
            $stateProvider.state('admin.class-rooms', {
                url: '?class-rooms',
                template: '<class-rooms class-rooms="class-rooms"></class-rooms>'
            })
        }])
        .controller('adminCtrl', adminCtrl);

        adminCtrl.$inject = [
            '$scope', 'scheduleService', 'adminService'
        ];

        function adminCtrl($scope, scheduleService, adminService) {
        	var model = this;

            $scope.update = false;

            model.initTables = function() {
                scheduleService.initTables();
            }

            model.logout = function() {
                scheduleService.logout();
            }
        }

})();