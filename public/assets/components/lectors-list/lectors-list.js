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
                lectors: "="
            },
            templateUrl: 'assets/components/lectors-list/lectors-list.tpl.html'
        };

        controller.$inject = [
            '$scope', 'adminService'
        ];

        function controller($scope, adminService) {

        	var model = this;
            model.lectors = $scope.lectors;

            adminService.getLectors().then(function(data){
                console.log(data);
                model.lectors = data;
            });

        }
    }

})()