(function() {
	var app = angular.module('app');

	var dayService = function(Restangular) {

		var getDays = function() {
			return Restangular.all('data').getList().then(function(response) {
				return response;
			});
		};

		return {
			getDays: getDays
		};
	};

	app.factory("dayService", dayService);
})();