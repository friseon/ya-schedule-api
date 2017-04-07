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

            $scope.$watch('model.isSelect', function(newV, oldV) {
                if (newV === false)
                    model.title = "Добавление новой лекции";
                else
                    model.title = "Редактирование лекции";
            })

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.popup2 = {
                opened: false
            };

            // добавление лекции
            model.addLecture = function(lecture) {
                scheduleService.addLecture(lecture).then(function(result) {
                    if (result === true) {
                        model.lecture = {};
                        getSchedule();
                    }
                });
            }

            // получение лекции
            var getLecture = function(id) {
                scheduleService.getLecture(id).then(function(result) {
                    if (result) {
                        model.lecture = result;
                    }
                });
            }

            // удаление лекции
            model.remove = function(lecture) {
                scheduleService.removeLecture(lecture).then(function(result) {
                    getSchedule();
                });
            }

            // выбрать лекцию и включить режим редактирования
            model.select = function(lecture) {
                model.lecture = getLecture(lecture.id);
                model.isSelect = true;
            }

            model.cancel =function() {
                model.lecture = {};
                model.isSelect = false;
            }

            // редактировать лекцию
            model.update = function(lecture) {
                scheduleService.updateLecture(lecture).then(function(result){
                    if (result === true) {
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