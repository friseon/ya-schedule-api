(function () {
    'use strict';

    angular
        .module('schedule')
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

            // следим за переменной, обновляем список при изменении данных
            $scope.$watch('update', function(newV, oldV) {
                if (newV !== oldV) 
                {
                    getLectors();
                    $scope.update = false;
                }                
            })

            // удаление лектора
            model.remove = function(lector) {
                adminService.removeLector(lector).then(function(result){
                    $scope.update = result ? result : false;
                });
            }

            // получение списка
            var getLectors = function() {
                adminService.getLectors().then(function(data){
                    $scope.lectors = data;
                });
            }

            getLectors();

        }
    }

})()