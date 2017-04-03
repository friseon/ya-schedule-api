(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('scheduleService', service)

	service.$inject = ['$http', '$location', '$route'];

    function service($http, $location, $route) {
    	var service = {
            login: login,
            logout: logout,
            getSchedule: getSchedule
    	}

    	return service;

        function getSchedule() {
            return $http.get('/getSchedule').then(function(result) {
                //console.log(result);
                if (result && result.data && !result.data.code) {
                    return result.data;
                }
                else {
                    console.error("Error. Service.getSchedule");
                    console.error(result.data);
                    return [];
                }
            }, function(err) {
                console.log(err);
            })
        }

        function logout() {
            return $http.get('/logout').then(function(data) {

                window.location = '/';
                localStorage.removeItem('user');
            }, function(err) {
                console.log(err);
            })
        }

        function login(user) {
            return $http.post('/login', user).then(function(result) {
                if (result.data.user) {                    
                    localStorage.setItem('user', result.data.user);
                    window.location = '/admin'
                }
            }, function(err) {
                console.log(err);
            })
        }
    }
    
})()