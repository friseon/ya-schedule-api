(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('classRooms', classRooms);

    function classRooms() {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: { },
            templateUrl: 'assets/components/class-rooms/class-rooms.tpl.html'
        };

        controller.$inject = [
            '$scope', 'classRoomsService'
        ];

        function controller($scope, classRoomsService) {

            var model = this;

            model.room = {};

            model.isSelect = false;

            $scope.$watch('model.isSelect', function(newV, oldV) {
                if (newV === false)
                    model.title = "Добавление новой аудитории";
                else
                    model.title = "Редактирование аудитории";
            })

            // добавление аудитории
            model.addClassRoom = function(room) {
                classRoomsService.addClassRoom(room).then(function(result) {
                    if (result === true) {
                        model.room = {};
                    }
                });
                getClassRooms();
            }

            // удаление аудитории
            model.remove = function(room) {
                classRoomsService.removeClassRoom(room).then(function(result){
                    if (result === true) {
                        getClassRooms();
                    }
                });
            }

            // выбрать аудиторию и включить режим редактирования
            model.select = function(room) {
                model.room = angular.copy(room);
                model.isSelect = true;
            }

            model.cancel =function() {
                model.room = {};
                model.isSelect = false;
            }

            // редактировать аудиторию
            model.update = function(room) {
                classRoomsService.updateClassRoom(room).then(function(result){
                    if (result === true) {
                        model.room = {};
                        model.isSelect = false;
                    }
                });
                getClassRooms();
            }

            // получение списка аудиторий
            var getClassRooms = function() {
                classRoomsService.getClassRooms().then(function(data){
                    model.rooms = data;
                });
            }

            getClassRooms();

        }
    }

})()