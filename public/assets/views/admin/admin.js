(function () {
    'use strict';

    angular
        .module('schedule')
        .config(['$stateProvider', function($stateProvider) {            

            $stateProvider.state('admin.schedule', {
                url: '-schedule',
                template: '<schedule></schedule>'
            })
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
            '$scope', 'adminService', '$location'
        ];

        function adminCtrl($scope, adminService, $location) {
        	var model = this;

            $scope.$watch(function(){
                return $location.path();
            }, function(value){
                if (value.indexOf('admin') > -1 && !localStorage.getItem("user")) {
                    window.location = "/"
                }
            })

            model.logout = function() {
                adminService.logout();
            }
        }

})();