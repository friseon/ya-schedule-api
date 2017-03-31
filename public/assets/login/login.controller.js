(function () {
	'use strict';
	angular
	    .module('login')
	    .controller('loginCtrl', loginCtrl)

	loginCtrl.$inject = [
        '$scope', 'loginService'
    ];
    console.log("!")
    function loginCtrl($scope, loginService) {
    	console.log("!")
    	var model = this;

        model.user = {
            login: "",
            password: ""
        }

        model.login = function (user) {
            loginService.login(user);
        }
    }
})()