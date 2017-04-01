(function () {
	'use strict';
	angular
	    .module('budget', ["ngRoute", "ui.router"])
	    .config(function($locationProvider) {
	        $locationProvider
	            .html5Mode({
	                enabled: true,
	                requireBase: false
	            });
	    })
    
})()