(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('schoolsService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            addSchool: addSchool,
            getSchools: getSchools,
            updateSchool: updateSchool,
            removeSchool: removeSchool,
    	}

    	return service;

        // добавление школы
        function addSchool(school) {
            console.log(school)
            return $http.post('/addSchool', school).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // обновление школы
        function updateSchool(school) {
            return $http.post('/updateSchool', school).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // удаление школы
        function removeSchool(school) {
            return $http.post('/removeSchool', school).then(function(result) {
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