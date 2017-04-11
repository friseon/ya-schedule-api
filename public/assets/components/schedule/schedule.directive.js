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
            model.lecture = {};

            model.isSelect = false;

            $scope.$watch('model.isSelect', function(newV, oldV) {
                if (newV === false)
                    model.title = "Добавление новой лекции";
                else
                    model.title = "Редактирование лекции";
            });

            // обновление даты для времени лекции
            var updateDate = function(date) {
                // начало лекции
                if (model.lecture.timeStart) {
                    model.lecture.timeStart.setFullYear(date.getFullYear());
                    model.lecture.timeStart.setMonth(date.getMonth());
                    model.lecture.timeStart.setDate(date.getDate());
                }
                else
                    model.lecture.timeStart = new Date(date);

                // окончание лекции
                if (model.lecture.timeEnd) {
                    model.lecture.timeEnd.setFullYear(date.getFullYear());
                    model.lecture.timeEnd.setMonth(date.getMonth());
                    model.lecture.timeEnd.setDate(date.getDate());
                }
                else {
                    model.lecture.timeEnd = new Date(date);
                }
            };

            // управление календарем
            model.isLectureDateOpened = false;

            model.openLectureDate = function() {
                model.isLectureDateOpened = true;
            };

            model.isLectureFull = function() {
                console.log(model.lecture);
                return model.lecture && model.lecture.name && model.lecture.idSchool && model.lecture.idLector && model.lecture.idRoom &&
                       model.lecture.date && model.lecture.timeStart && model.lecture.timeEnd
            };

            // добавление лекции
            model.addLecture = function(lecture) {
                updateDate(lecture.date);
                scheduleService.addLecture(lecture).then(function(result) {
                    if (result === true) {
                        model.lecture = {};
                        getSchedule();
                    }
                });
            };

            // получение лекции
            var getLecture = function(id) {
                scheduleService.getLecture(id).then(function(result) {
                    if (result) {
                        model.lecture = result;
                        model.lecture.date = new Date(model.lecture.date);
                        model.lecture.timeStart = new Date(model.lecture.timeStart);
                        model.lecture.timeEnd = new Date(model.lecture.timeEnd);
                    }
                });
            };

            // удаление лекции
            model.remove = function(lecture) {
                scheduleService.removeLecture(lecture).then(function(result) {
                    getSchedule();
                });
            };

            // выбрать лекцию и включить режим редактирования
            model.select = function(lecture) {
                model.lecture = getLecture(lecture.id);
                model.isSelect = true;
            };

            model.cancel =function() {
                model.lecture = {};
                model.isSelect = false;
            };

            // редактировать лекцию
            model.update = function(lecture) {
                updateDate(lecture.date);
                scheduleService.updateLecture(lecture).then(function(result){
                    if (result === true) {
                        model.lecture = {};
                        model.isSelect = false;
                        getSchedule();
                    }
                });
            };

            // получение расписания
            var getSchedule = function() {
                scheduleService.getSchedule().then(function(data){
                    model.schedule = data;
                });
            };

            // получение школ
            var getSchools = function() {
                schoolsService.getSchools().then(function(data){
                    model.schools = data;
                });
            };

            // получение лекторов
            var getLectors = function() {
                lectorsService.getLectors().then(function(data){
                    model.lectors = data;
                });
            };

            // получение аудиториц
            var getRooms = function() {
                classRoomsService.getClassRooms().then(function(data){
                    model.rooms = data;
                });
            };

            getLectors();

            getRooms();

            getSchools();

            getSchedule();

        }
    }

})()