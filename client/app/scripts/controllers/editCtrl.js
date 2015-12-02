(function() {
	var app = angular.module('app');

	var editController = function($scope, $state, $stateParams, purchasesService) {
		purchasesService.getPurchases().then(function(data) {
			$scope.purchase = data;
			$scope.purchaseId = $stateParams.index;

			//Find the purchase with id that we want to edit.
			for (var i = 0; i < $scope.purchase.length; i++) {
				if ($scope.purchaseId == $scope.purchase[i].id) {
					$scope.editPurchase = $scope.purchase[i];
				}
			}

			$scope.editPurchases = function() {
				var data = $scope.editPurchase.plain();
				purchasesService.editPurchase(data).then(function() {
					$state.go('Purchases', {}, {
						reload: true
					});
				});
			};
		});

		$scope.deletePurchase = function() {
			purchasesService.deletePurchase($scope.purchaseId).then(function() {
				$state.go($state.current, {}, {
					reload: true
				});
			});
		};
	};

	app.controller("editController", editController);
})();