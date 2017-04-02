(function () {
    'use strict';

    angular
        .module('budget')
        .config(['$stateProvider', function($stateProvider) {
            var login = {
                name: 'login',
                url: '/login',
                controller: 'loginCtrl',
                controllerAs: 'model',
                templateUrl: 'assets/views/login/login.tpl.html'
            }

            $stateProvider.state(login);
        }])
        .controller('loginCtrl', loginCtrl);

        loginCtrl.$inject = [
            '$scope', 'budgetService'
        ];
        function loginCtrl($scope, budgetService) {
        	var model = this;
            console.log("login");

            model.user = {
                login: "",
                password: ""
            }

            model.login = function (user) {
                budgetService.login(user);
            }
        }

})();