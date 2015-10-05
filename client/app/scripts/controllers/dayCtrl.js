(function() {
	var app = angular.module("app");

	var dayController = function($scope, Restangular) {
		Restangular.all('data').getList().then(function(data) {
			$scope.days = data;
		});
	};

	app.controller("dayController", dayController);
})();