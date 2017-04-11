(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('homeCtrl', homeCtrl);

        homeCtrl.$inject = [
            '$scope', 'appService'
        ];

        function homeCtrl($scope, appService) {
        	var model = this;

            model.schedule = [];

            var getSchedule = function() {
                appService.getSchedule().then(function(data) {
                    model.schedule = data;
                    console.log(data);
                });
            }

            getSchedule();
        }

})();