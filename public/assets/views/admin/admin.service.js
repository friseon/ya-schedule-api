(function () {
	'use strict';
	angular
	    .module('budget')
	    .service('adminService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
    		getLectors: getLectors,
            addLector: addLector,
            removeLector: removeLector,
            addSchool: addSchool,
            removeSchool: removeSchool,
            getSchools: getSchools
    	}

    	return service;

        // Lectors

        // добавление лектора
        function addLector(lector) {
            return $http.post('/addLector', lector).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // удаление лектора
        function removeLector(lector) {
            return $http.post('/removeLector', lector).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // получение всех лекторов
    	function getLectors() {
    		return $http.get('/getLectors').then(function(result) {
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