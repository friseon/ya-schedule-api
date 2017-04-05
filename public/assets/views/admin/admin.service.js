(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('adminService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            logout: logout
    	}

    	return service;

        function logout() {
            return $http.get('/logout').then(function(data) {
                window.location = '/';
                localStorage.removeItem('user');
            }, function(err) {
                console.log(err);
            })
        }
    }
    
})()