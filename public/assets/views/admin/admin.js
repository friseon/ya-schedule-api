(function () {
    'use strict';

    angular
        .module('schedule')
        .config(['$stateProvider', function($stateProvider) {
            var admin = {
                name: 'admin',
                url: '/admin',
                templateUrl: 'assets/views/admin/admin.tpl.html',
                controller: 'adminCtrl',
                controllerAs: 'model'
            }

            $stateProvider.state(admin);

            $stateProvider.state('admin.lectors', {
                url: '-lectors',
                template: '<lectors></lectors>'
            })
            $stateProvider.state('admin.schools', {
                url: '-schools',
                template: '<schools schools="schools"></schools>'
            })
            $stateProvider.state('admin.class-rooms', {
                url: '-class-rooms',
                template: '<class-rooms class-rooms="class-rooms"></class-rooms>'
            })
        }])
        .controller('adminCtrl', adminCtrl);

        adminCtrl.$inject = [
            '$scope', 'scheduleService', '$location'
        ];

        function adminCtrl($scope, scheduleService, $location) {
        	var model = this;

            $scope.$watch(function(){
                return $location.path();
            }, function(value){
                if (value.indexOf('admin') > -1 && !localStorage.getItem("user")) {
                    window.location = "/"
                }
            })

            model.logout = function() {
                scheduleService.logout();
            }
        }

})();