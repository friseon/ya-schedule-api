(function () {
	'use strict';
	angular
	    .module('schedule', ["ngRoute", "ui.router", "ui.bootstrap"])
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

            var admin = {
                name: 'admin',
                url: '/admin',
                templateUrl: 'assets/views/admin/admin.tpl.html',
                controller: 'adminCtrl',
                controllerAs: 'model'
            }

            $stateProvider.state(admin);

            $stateProvider.state(login);
            
            $stateProvider.state(home);
        }])
    
})()