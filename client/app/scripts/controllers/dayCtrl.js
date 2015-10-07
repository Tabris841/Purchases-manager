(function() {
	var app = angular.module("app");

	var dayController = function($scope, Restangular) {
		Restangular.all('data').getList().then(function(data) {
			$scope.days = data;
		});
		console.log($scope.days);

		$scope.selectedIndex = 0;
		$scope.itemClicked = function($index) {
			$scope.selectedIndex = $index;
		};
	};

	app.controller("dayController", dayController);
})();