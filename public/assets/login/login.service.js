(function () {
	'use strict';
	angular
	    .module('login')
	    .service('loginService', loginService)

	loginService.$inject = ['$http'];

    function loginService($http) {
    	var service = {
            login: login
    	}

    	return service;

    	function login(user) {
            return $http.post('/login', user).then(function(result) {
                console.log(result);
                if (result.data.user) {                    
                    localStorage.setItem('user.email', result.data.user.email);
                    localStorage.setItem('user.id', result.data.user.id);
                    localStorage.setItem('user.admin', result.data.user.admin);
                    localStorage.setItem('user.name', result.data.user.name);
                    if (result.data.user.admin !== 1) {
                        $location.path('/home');
                    }
                    else {
                        $location.path('/admin');
                    }
                }
            }, function(err) {
                console.log(err);
            })
        }
    }
})()