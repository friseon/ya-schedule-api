(function () {
	'use strict';
	angular
	    .module('budget', ["ngRoute"])
	    .config(function($locationProvider) {
	        $locationProvider
	            .html5Mode({
	                enabled: true,
	                requireBase: false
	            });
	    })
    
})()