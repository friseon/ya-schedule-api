(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('schedule', schedule);

    function schedule() {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: { },
            templateUrl: 'assets/components/schedule/schedule.tpl.html'
        };

        controller.$inject = [
            '$scope', 'scheduleService', 'schoolsService', 'lectorsService', 'classRoomsService'
        ];

        function controller($scope, scheduleService, schoolsService, lectorsService, classRoomsService) {

            var model = this;
            model.schedule = [];

            model.isSelect = false;

            model.message = "";

            $scope.$watch('model.isSelect', function(newV, oldV) {
                if (newV === false)
                    model.title = "Добавление новой школы";
                else
                    model.title = "Редактирование школы";
            })

            // добавление школы
            model.addLecture = function(lecture) {
                scheduleService.addLecture(lecture).then(function(result) {
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true) {
                        model.message = "";
                        model.lecture = {};
                        getSchedule();
                    }
                });
            }

            // удаление школы
            model.remove = function(lecture) {
                scheduleService.removeLecture(lecture).then(function(result) {
                    getSchedule();
                });
            }

            // выбрать лекцию и включить режим редактирования
            model.select = function(lecture) {
                model.lecture = angular.copy(lecture);
                model.isSelect = true;
            }

            model.cancel =function() {
                model.lecture = {};
                model.isSelect = false;
            }

            // редактировать лекцию
            model.update = function(lecture) {
                scheduleService.updateLecture(lecture).then(function(result){
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true){
                        model.message = "";
                        model.lecture = {};
                        model.isSelect = false;
                    }
                });
                getSchedule();
            }

            // получение расписания
            var getSchedule = function() {
                scheduleService.getSchedule().then(function(data){
                    model.schedule = data;
                });
            }

            // получение школ
            var getSchools = function() {
                schoolsService.getSchools().then(function(data){
                    model.schools = data;
                });
            }

            // получение лекторов
            var getLectors = function() {
                lectorsService.getLectors().then(function(data){
                    model.lectors = data;
                });
            }

            // получение аудиториц
            var getRooms = function() {
                classRoomsService.getClassRooms().then(function(data){
                    model.rooms = data;
                });
            }

            getLectors();

            getRooms();

            getSchools();

            getSchedule();

        }
    }

})()