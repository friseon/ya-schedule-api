(function () {
    'use strict';

    angular
        .module('schedule')
        .directive('schools', schools);

    function schools() {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'model',
            scope: {
                schools: "="
            },
            templateUrl: 'assets/components/schools/schools.tpl.html'
        };

        controller.$inject = [
            '$scope', 'adminService'
        ];

        function controller($scope, adminService) {

            var model = this;
            model.schools = $scope.schools;

            // добавление школы
            model.addSchool = function(school) {
                adminService.addSchool(school).then(function(result) {
                    if (result && result.error) {
                        model.message = result.error;
                    }
                    else if (result === true) {
                        model.message = "";
                        model.school = {};
                        getSchools();
                    }
                });
            }

            // удаление школы
            model.remove = function(school) {
                adminService.removeSchool(school).then(function(result){
                     getSchools();
                });
            }

            // получение списка
            var getSchools = function() {
                adminService.getSchools().then(function(data){
                    $scope.schools = data;
                });
            }

            getSchools();

        }
    }

})()