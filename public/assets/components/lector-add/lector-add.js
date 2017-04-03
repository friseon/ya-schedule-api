(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('lectorAdd', lectorAdd);

    function lectorAdd() {
    	return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: {
                "update": "="
            },
            templateUrl: 'assets/components/lector-add/lector-add.tpl.html'
        };

        controller.$inject = [
            '$scope', 'adminService'
        ];

        function controller($scope, adminService) {

        	var model = this;

            model.lector = {};
            
            // сообщение, если, например, такой лектор уже существует
            model.message = "";

            // добавление лектора
            model.addLector = function(lector) {
                adminService.addLector(lector).then(function(result) {
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true){
                        model.message = "";
                        model.lector = {};
                    }
                });
                $scope.update = true;
            }

        }
    }

})()