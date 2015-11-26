(function() {
	var app = angular.module('app');

	var purchasesController = function($scope, $state, $stateParams, purchasesService) {
		purchasesService.getPurchases().then(function(data) {
			$scope.purchase = data;
			$scope.purchases = [];
			$scope.daysName = $stateParams.day;

			//Look through all purchases and finds that who match with the day and push them in array.
			for (var x = 0; x < $scope.purchase.length; x++) {
				if ($scope.daysName == $scope.purchase[x].day) {
					$scope.purchases.push($scope.purchase[x]);
				}
			}

			$scope.deletePurchase = function(index) {
				purchasesService.deletePurchase(index).then(function() {
					$state.go($state.current, {}, {
						reload: true
					});
				});
			};
		});
	};

	app.controller("purchasesController", purchasesController);
})();