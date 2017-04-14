(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('homeCtrl', homeCtrl);

        homeCtrl.$inject = [
            '$scope', 'appService', '$uibModal', 'modalsConstants'
        ];

        function homeCtrl($scope, appService, $uibModal, modalsConstants) {
        	var model = this;

            model.schedule = [];

            var getSchedule = function() {
                appService.getSchedule().then(function(data) {
                    console.log(data);
                    model.schedule = data;
                });
            }

            model.openLector = function (id) {
                var modalInstance = 
                    $uibModal.open({
                        templateUrl: modalsConstants.lectorInfoTpl,
                        controller: 'modalLectorInfoCtrl',
                        controllerAs: 'ctrl',
                        resolve: {
                            id: function () {
                              return id;
                            } 
                        }
                });

                modalInstance.result.then(function () {

                }, function () {

                });
            };

            model.openClassRoom = function (id) {
                var modalInstance = 
                    $uibModal.open({
                        templateUrl: modalsConstants.classRoomInfoTpl,
                        controller: 'modalClassRoomInfoCtrl',
                        controllerAs: 'ctrl',
                        resolve: {
                            id: function () {
                              return id;
                            } 
                        }
                });

                modalInstance.result.then(function () {

                }, function () {
                    
                });
            };

            getSchedule();
        }

})();