(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('lectorsService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            addLector: addLector,
            getLectors: getLectors,
            updateLector: updateLector,
            removeLector: removeLector,
    	}

    	return service;

        // добавление лектора
        function addLector(lector) {
            return $http.post('/addLector', lector).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // обновление лектора
        function updateLector(lector) {
            return $http.post('/updateLector', lector).then(function(result) {
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

        // получение лекторов из расписания
        function getLectorsFromShedule() {
            return $http.get('/getLectorsFromShedule').then(function(result) {
                if (result && result.data && !result.data.code) {
                    return result.data;
                }
                else {
                    console.error("Error. Service.getLectorsFromShedule");
                    console.error(result.data);
                    return [];
                }
            }, function(err) {
                console.log(err);
            })
        };
    }
    
})()