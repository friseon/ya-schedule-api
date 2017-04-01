(function () {
    'use strict';

    angular
        .module('budget')
        .directive('lectorsList', lectorsList);

    function lectorsList() {
    	return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: {
                lectors: "=",
                update: "="
            },
            templateUrl: 'assets/components/lectors-list/lectors-list.tpl.html'
        };

        controller.$inject = [
            '$scope', 'adminService'
        ];

        function controller($scope, adminService) {

        	var model = this;
            model.lectors = $scope.lectors;
            model.update = $scope.update;

            $scope.$watch('update', function() {
                getLectors();
                $scope.update = false;
            })

            model.remove = function(lector) {
                adminService.removeLector(lector).finally(function(data){
                    console.log(data);
                     $scope.update = true;
                });
            }

            var getLectors = function() {
                adminService.getLectors().then(function(data){
                    model.lectors = data;
                });
            }

            getLectors();

        }
    }

})()