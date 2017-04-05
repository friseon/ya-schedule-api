import "./main-header.scss";

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
                isLogin: '='
            },
            templateUrl: 'assets/components/main-header/main-header.tpl.html'
        };

        controller.$inject = [
            '$scope', 'appService'
        ];

        function controller($scope, appService) {
        	var model = this;

            model.isLogin = $scope.isLogin;

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
                appService.logout();
            }

        }
    }

})();