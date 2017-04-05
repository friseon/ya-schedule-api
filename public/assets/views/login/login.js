(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('loginCtrl', loginCtrl);

        loginCtrl.$inject = [
            '$scope', 'appService'
        ];

        function loginCtrl($scope, appService) {
        	var model = this;

            model.user = {
                login: "",
                password: ""
            }

            model.login = function (user) {
                appService.login(user);
            }
        }

})();