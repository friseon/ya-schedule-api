(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('scheduleService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            addLecture: addLecture,
            updateLecture: updateLecture,
            removeLecture: removeLecture,
            getLecture: getLecture
    	}

    	return service;

        // добавление лекции
        function addLecture(lecture) {
            return $http.post('/addLecture', lecture).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // получение лекции
        function getLecture(id) {
            return $http.get('/lecture/' + id, {
                params: {
                    id: id
                }
            }).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // обновление лекции
        function updateLecture(lecture) {
            return $http.post('/updateLecture', lecture).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // удаление лекции
        function removeLecture(lecture) {
            return $http.post('/removeLecture', lecture).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }
    }
    
})()