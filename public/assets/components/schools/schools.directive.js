(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('schools', schools);

    function schools() {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: { },
            templateUrl: 'assets/components/schools/schools.tpl.html'
        };

        controller.$inject = [
            '$scope', 'schoolsService'
        ];

        function controller($scope, schoolsService) {

            var model = this;
            model.schools = [];

            model.isSelect = false;

            model.message = "";

            $scope.$watch('model.isSelect', function(newV, oldV) {
                if (newV === false)
                    model.title = "Добавление новой школы";
                else
                    model.title = "Редактирование школы";
            })

            // добавление школы
            model.addSchool = function(school) {
                schoolsService.addSchool(school).then(function(result) {
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true) {
                        model.message = "";
                        model.school = {};
                        getSchools();
                    }
                });
            }

            // удаление школы
            model.remove = function(school) {
                schoolsService.removeSchool(school).then(function(result) {
                    getSchools();
                });
            }

            // выбрать школу и включить режим редактирования
            model.select = function(school) {
                model.school = angular.copy(school);
                model.isSelect = true;
            }

            model.cancel =function() {
                model.school = {};
                model.isSelect = false;
            }

            // редактировать школу
            model.update = function(school) {
                schoolsService.updateSchool(school).then(function(result){
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true){
                        model.message = "";
                        model.school = {};
                        model.isSelect = false;
                    }
                });
                getSchools();
            }

            // получение списка
            var getSchools = function() {
                schoolsService.getSchools().then(function(data){
                    model.schools = data;
                });
            }

            getSchools();

        }
    }

})()