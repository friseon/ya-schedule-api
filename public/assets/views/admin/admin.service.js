(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('adminService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            addSchool: addSchool,
            removeSchool: removeSchool,
            getSchools: getSchools,
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

        // Schools

        // добавление школы
        function addSchool(schoold) {
            return $http.post('/addSchool', schoold).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // удаление школы
        function removeSchool(schoold) {
            return $http.post('/removeSchool', schoold).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // получение всех школ
        function getSchools() {
            return $http.get('/getSchools').then(function(result) {
                if (result && result.data && !result.data.code) {
                    return result.data;
                }
                else {
                    return [];
                }
            }, function(err) {
                console.log(err);
            })
        }
    }
    
})()