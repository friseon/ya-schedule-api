(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('appService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            login: login,
            getSchedule: getSchedule,
            isLogin: isLogin,
            logout: logout
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
        };

        function isLogin() {
            return $http.get('/isLogin').then(function(result) {
                console.log(result)
                return result;
            }, function(err) {
                console.log(err);
            })
        };

        function login(user) {
            return $http.post('/login', user).then(function(result) {
                if (result.data.user) {                    
                    localStorage.setItem('user', result.data.user);
                    window.location = '/admin'
                }
            }, function(err) {
                console.log(err);
            })
        };

        function logout() {
            console.log("!");
            return $http.post('/logout').then(function(data) {
                window.location = '/';
                localStorage.removeItem('user');
            }, function(err) {
                console.log(err);
            })
        };
    }
    
})()