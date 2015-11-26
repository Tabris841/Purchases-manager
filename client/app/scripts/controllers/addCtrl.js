(function() {
	var app = angular.module('app');

	var addController = function($scope, $state, Restangular, $stateParams, purchasesService) {
		$scope.daysName = $stateParams.day;

		$scope.savePurchase = function() {
			$scope.newPurchase.day = $scope.daysName;
			purchasesService.addPurchase($scope.newPurchase).then(function() {
				$state.go('Purchases', {}, {
					reload: true
				});
			});
		};
	};

	app.controller("addController", addController);
})();