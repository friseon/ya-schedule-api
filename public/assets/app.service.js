(function () {
	'use strict';
	angular
	    .module('budget')
	    .service('budgetService', service)

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
                // $location.path('/login');

                window.location = '/'
                console.log(data)
                $route.reload();
                localStorage.removeItem('user.email');
                localStorage.removeItem('user.id');
                localStorage.removeItem('user.admin');
                localStorage.removeItem('user.name');
            }, function(err) {
                console.log(err);
            })
        }

        function login(user) {
            return $http.post('/login', user).then(function(result) {
                console.log(result);
                if (result.data.user) {                    
                    localStorage.setItem('user.email', result.data.user.email);
                    localStorage.setItem('user.id', result.data.user.id);
                    localStorage.setItem('user.admin', result.data.user.admin);
                    localStorage.setItem('user.name', result.data.user.name);
                }
            }, function(err) {
                console.log(err);
            })
        }
    }
    
})()