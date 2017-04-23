(function () {
	'use strict';
	angular
	    .module('schedule')
	    .service('classRoomsService', service)

	service.$inject = ['$http'];

    function service($http) {
    	var service = {
            addClassRoom: addClassRoom,
            getClassRooms: getClassRooms,
            updateClassRoom: updateClassRoom,
            removeClassRoom: removeClassRoom,
            getClassRoomsFromShedule: getClassRoomsFromShedule
    	}

    	return service;

        // добавление аудитории
        function addClassRoom(classRoom) {
            return $http.post('/addClassRoom', classRoom).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // обновление аудитории
        function updateClassRoom(classRoom) {
            return $http.post('/updateClassRoom', classRoom).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // удаление аудитории
        function removeClassRoom(classRoom) {
            return $http.post('/removeClassRoom', classRoom).then(function(result) {
                return result ? result.data : false;
            }, function(err) {
                console.log(err);
            })
        }

        // получение всех аудиторий
        function getClassRooms() {
            return $http.get('/getClassRooms').then(function(result) {
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

        // получение аудиторий из расписания
        function getClassRoomsFromShedule() {
            return $http.get('/getClassRoomsFromShedule').then(function(result) {
                if (result && result.data && !result.data.code) {
                    return result.data;
                }
                else {
                    console.error("Error. Service.getClassRoomsFromShedule");
                    console.error(result.data);
                    return [];
                }
            }, function(err) {
                console.log(err);
            })
        };
    }
    
})()