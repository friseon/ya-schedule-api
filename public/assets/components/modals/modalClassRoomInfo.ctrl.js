(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('modalClassRoomInfoCtrl', lectorInfo);

        lectorInfo.$inject = [
            '$scope', 'appService', 'id'
        ];

        function lectorInfo($scope, appService, id) {
        	var ctrl = this;

            ctrl.classRoom = {};

            var getClassRoom = function() {
                appService.getClassRoom(id).then(function(data) {
                    console.log(data);
                    ctrl.classRoom = data;
                });
            }
            
            getClassRoom();
        }

})();