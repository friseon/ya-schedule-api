// (function () {
//     'use strict';

//     angular
//         .module('budget')
//         .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            
//         }])
//         .controller('loginCtrl', loginCtrl);

//         loginCtrl.$inject = [
//             '$scope', 'budgetService'
//         ];

//         function loginCtrl($scope, budgetService) {
//         	var model = this;
//             console.log("login");

//             model.user = {
//                 login: "",
//                 password: ""
//             }

//             model.login = function (user) {
//                 budgetService.login(user);
//             }
//         }

// })();