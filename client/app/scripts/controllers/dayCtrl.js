(function() {
	var app = angular.module("app");

	var dayController = function($scope, dayService) {
		dayService.getDays().then(function(data) {
			$scope.days = data;
		});

		$scope.selectedIndex = 0;
		$scope.itemClicked = function($index) {
			$scope.selectedIndex = $index;
		};
	};

	app.controller("dayController", dayController);
})();