(function () {
    'use strict';

    angular
        .module('schedule')
        .controller('modalLectorInfoCtrl', lectorInfo);

        lectorInfo.$inject = [
            '$scope', 'appService', 'id'
        ];

        function lectorInfo($scope, appService, id) {
        	var ctrl = this;

            ctrl.lector = {};

            var getLector = function() {
                appService.getLector(id).then(function(data) {
                    ctrl.lector = data;
                });
            }
            
            getLector();
        }

})();