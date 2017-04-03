(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('mainHeader', mainHeader);

    function mainHeader() {
    	return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: {
                isAdmin: '='
            },
            templateUrl: 'assets/components/main-header/main-header.tpl.html'
        };

        controller.$inject = [
            '$scope', 'scheduleService', '$http'
        ];

        function controller($scope, scheduleService, $http) {
        	var model = this;
            model.isAdmin = $scope.isAdmin;

            model.linkTo = function(path) {
                if (window.location.pathname !== '/' + path) {
                    window.location = '/' + path;
                }
            }

            model.isActive = function(path) {
                if (window.location.pathname.indexOf(path) > -1) {
                    return true;
                }
                return false;
            }

            model.logout = function() {
                scheduleService.logout();
            }

        }
    }

})();