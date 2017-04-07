(function () {
	'use strict';
	angular
	    .module('schedule', ["ngRoute", "ui.router", "ui.bootstrap", "ngToast"])
	    .config(function($locationProvider) {
	        $locationProvider
	            .html5Mode({
	                enabled: true,
	                requireBase: false
	            });
	    })    
        .config(['$stateProvider', '$httpProvider' , function($stateProvider, $httpProvider) {
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

            $httpProvider.interceptors.push('allert');
        }])
        .factory('allert', ['$log', 'ngToast', function($log, ngToast) {

            var allert = {
                'response': function(response) {
                    if(typeof response && response.data) {
                        if (response.data.error)
                            ngToast.create({
                              className: 'danger',
                              content: response.data.error
                            });
                        if (response.data.warning)
                            ngToast.create({
                              className: 'warning',
                              content: response.data.warning
                            });
                    }
                    return response
                }
            };

            return allert;
        }]);
    
})()