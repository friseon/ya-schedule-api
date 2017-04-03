(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('homeCtrl', homeCtrl);

        homeCtrl.$inject = [
            '$scope', 'scheduleService'
        ];

        function homeCtrl($scope, scheduleService) {
        	var model = this;
            console.log("home")
            var getSchedule = function() {
                scheduleService.getSchedule().then(function(data) {
                    console.log(data);
                });
            }

            getSchedule();
        }

})();