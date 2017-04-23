(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('homeCtrl', homeCtrl);

        homeCtrl.$inject = [
            '$scope', 'appService', '$uibModal', 'modalsConstants', 'scheduleConstants', 'schoolsService', 'classRoomsService'
        ];

        function homeCtrl($scope, appService, $uibModal, modalsConstants, scheduleConstants, schoolsService, classRoomsService) {
        	var model = this;

            model.schedule = [];
            model.months = [];
            model.schools = [];
            model.rooms = [];

            // управление календарем от
            model.isLectureFromDateOpened = false;
            // управление календарем до
            model.isLectureToDateOpened = false;

            model.openLectureFromDate = function() {
                model.isLectureFromDateOpened = true;
            };

            model.openLectureToDate = function() {
                model.isLectureToDateOpened = true;
            };

            // получение школ из расписания
            var getSchools = function() {
                schoolsService.getSchoolsFromShedule().then(function(data){
                    model.schools = data;
                });
            };

            // получение аудиторий из расписания
            var getRooms = function() {
                classRoomsService.getClassRoomsFromShedule().then(function(data){
                    model.rooms = data;
                });
            };

            getSchools();
            getRooms();

            var getSchedule = function() {
                appService.getSchedule().then(function(data) {
                    for (var key in data) {
                        model.months.push(scheduleConstants.months[key.split(".")[0]] + " " + key.split(".")[1]);
                    }
                    model.schedule = data;
                });
            }

            model.openLector = function (id) {
                var modalInstance = 
                    $uibModal.open({
                        templateUrl: modalsConstants.lectorInfoTpl,
                        controller: 'modalLectorInfoCtrl',
                        controllerAs: 'ctrl',
                        resolve: {
                            id: function () {
                              return id;
                            } 
                        }
                });

                modalInstance.result.then(function () {

                }, function () {

                });
            };

            model.openClassRoom = function (id) {
                var modalInstance = 
                    $uibModal.open({
                        templateUrl: modalsConstants.classRoomInfoTpl,
                        controller: 'modalClassRoomInfoCtrl',
                        controllerAs: 'ctrl',
                        resolve: {
                            id: function () {
                              return id;
                            } 
                        }
                });

                modalInstance.result.then(function () {

                }, function () {
                    
                });
            };

            getSchedule();
        }

})();