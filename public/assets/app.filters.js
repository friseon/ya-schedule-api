(function () {
    'use strict';

    angular
        .module('schedule')
        .filter('fromTo', fromTo);

		function fromTo() {
			return function(items, from, to) {
				items = _.filter(items, function(item) {
					var date = new Date(item.date);
					return (date >= from && date <= to) || (date >= from && !to) || (date <= to && !from) || (!to && !from);
				})

				return items;

			}

			
		}

})();