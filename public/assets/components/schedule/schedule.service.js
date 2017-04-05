(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('scheduleService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            addLecture: addLecture,
            getSchedule: getSchedule,
            updateLecture: updateLecture,
            removeLecture: removeLecture,
    	}

    	return service;

        // добавление лекции
        function addLecture(school) {
            console.log(school)
            return $http.post('/addLecture', school).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // обновление лекции
        function updateLecture(school) {
            return $http.post('/updateLecture', school).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // удаление лекции
        function removeLecture(school) {
            return $http.post('/removeLecture', school).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // получение всех лекций
        function getSchedule() {
            return $http.get('/getSchedule').then(function(result) {
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