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
            removeLector: removeLector
    	}

    	return service;

        function addLector(lector) {
            return $http.post('/addLector', lector).then(function(result) {
                return result ? result.data : {};
            }, function(err) {
                console.log(err);
            })
        }

        function removeLector(lector) {
            return $http.post('/removeLector', lector).then(function(result) {
                return result ? result.data : {};
            }, function(err) {
                console.log(err);
            })
        }

    	function getLectors() {
    		return $http.get('/getLectors').then(function(result) {
    			console.log(result);
    			if (result && result.data && !result.data.code) {
    				return result.data;
    			}
    			else {
    				console.error(result.data);
    				return [];
    			}
    		}, function(err) {
    			console.log(err);
    		})
    	}
    }
    
})()