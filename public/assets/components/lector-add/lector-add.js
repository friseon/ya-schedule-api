(function () {
    'use strict';

    angular
        .module('budget')
        .directive('lectorAdd', lectorAdd);

    function lectorAdd() {
    	return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: { },
            templateUrl: 'assets/components/lector-add/lector-add.tpl.html'
        };

        controller.$inject = [
            '$scope', 'adminService'
        ];

        function controller($scope, adminService) {

        	var model = this;

            model.lector = {};

            model.message = "";

            model.addLector = function(lector) {
                adminService.addLector(lector).then(function(result) {
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else {
                        model.message = "";
                    }
                });
                console.log(lector);
            }

        }
    }

})()