(function () {
	'use strict';
	angular
	    .module('schedule', ["ngRoute", "ui.router"])
	    .config(function($locationProvider) {
	        $locationProvider
	            .html5Mode({
	                enabled: true,
	                requireBase: false
	            });
	    })    
        .config(['$stateProvider', function($stateProvider) {
            var home = {
                name: 'home',
                url: '/home',
                controller: 'homeCtrl',
                controllerAs: 'model',
                templateUrl: 'assets/views/home/home.tpl.html'
            }


            var login = {
                name: 'login',
                url: '/login',
                controller: 'loginCtrl',
                controllerAs: 'model',
                templateUrl: 'assets/views/login/login.tpl.html'
            }

            $stateProvider.state(login);
            
            $stateProvider.state(home);
        }])
    
})()