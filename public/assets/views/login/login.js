(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('loginCtrl', loginCtrl);

        loginCtrl.$inject = [
            '$scope', 'scheduleService'
        ];

        function loginCtrl($scope, scheduleService) {
        	var model = this;

            model.user = {
                login: "",
                password: ""
            }

            model.login = function (user) {
                scheduleService.login(user);
            }
        }

})();