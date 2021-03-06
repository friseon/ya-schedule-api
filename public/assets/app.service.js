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
            getLector: getLector,
            getClassRoom: getClassRoom,
            isLogin: isLogin,
            logout: logout
    	}

    	return service;

        function getLector(id) {
            return $http.get('/lector/' + id, {
                params: {
                    id: id
                }
            }).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        function getClassRoom(id) {
            return $http.get('/classRoom/' + id, {
                params: {
                    id: id
                }
            }).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        function getSchedule() {
            return $http.get('/getSchedule').then(function(result) {
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
            return $http.post('/logout').then(function(data) {
                window.location = '/';
                localStorage.removeItem('user');
            }, function(err) {
                console.log(err);
            })
        };
    }
    
})()