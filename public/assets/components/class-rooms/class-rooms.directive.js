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
            scope: {
                classRooms: "="
            },
            templateUrl: 'assets/components/class-rooms/class-rooms.tpl.html'
        };

        controller.$inject = [
            '$scope', 'adminService'
        ];

        function controller($scope, adminService) {

            var model = this;
            model.room = $scope.room;

            // добавление школы
            model.addClassRoom = function(room) {
                adminService.addClassRoom(room).then(function(result) {
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true) {
                        model.message = "";
                        model.room = {};
                        getClassRooms();
                    }
                });
            }

            // удаление школы
            model.remove = function(room) {
                adminService.removeClassRoom(room).then(function(result){
                     getClassRooms();
                });
            }

            // получение списка
            var getClassRooms = function() {
                adminService.getClassRooms().then(function(data){
                    $scope.rooms = data;
                });
            }

            getClassRooms();

        }
    }

})()