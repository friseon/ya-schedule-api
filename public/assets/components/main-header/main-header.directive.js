(function () {
    'use strict';

    angular
        .module('budget')
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
            '$scope', 'budgetService', '$http'
        ];

        function controller($scope, budgetService, $http) {
        	var model = this;
            model.isAdmin = $scope.isAdmin;

            model.linkTo = function(path) {
                if (window.location.pathname !== '/' + path) {
                    window.location = '/' + path;
                }
            }

            model.logout = function() {
                budgetService.logout();
            }

        }
    }

})();