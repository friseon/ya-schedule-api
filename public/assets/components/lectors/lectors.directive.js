(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('lectors', lectors);

    function lectors() {
    	return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: { },
            templateUrl: 'assets/components/lectors/lectors.tpl.html'
        };

        controller.$inject = [
            '$scope', 'lectorsService'
        ];

        function controller($scope, lectorsService) {

        	var model = this;

            model.lector = {};

            model.lectors = [];

            model.isSelect = false;

            $scope.$watch('model.isSelect', function(newV, oldV) {
                if (newV === false)
                    model.title = "Добавление нового лектора";
                else
                    model.title = "Редактирование лектора";
            })

            // добавление лектора
            model.addLector = function(lector) {
                lectorsService.addLector(lector).then(function(result) {
                    if (result === true) {
                        model.lector = {};
                    }
                });
                getLectors();
            }

            // удаление лектора
            model.remove = function(lector) {
                lectorsService.removeLector(lector).then(function(result){
                    if (result === true) {
                        getLectors();
                    }
                });
            }

            // выбрать лектора и включить режим редактирования
            model.select = function(lector) {
                model.lector = angular.copy(lector);
                model.isSelect = true;
            }

            model.cancel =function() {
                model.lector = {};
                model.isSelect = false;
            }

            // редактировать лектора
            model.update = function(lector) {
                lectorsService.updateLector(lector).then(function(result){
                    if (result === true) {
                        model.lector = {};
                        model.isSelect = false;
                    }
                });
                getLectors();
            }

            // получение списка лекторов
            var getLectors = function() {
                lectorsService.getLectors().then(function(data){
                    model.lectors = data;
                });
            }

            getLectors();

        }
    }

})()