(function() {
	var app = angular.module('app');

	var editController = function($scope, $state, Restangular, $stateParams) {
		Restangular.all('purchase').getList().then(function(data) {
			$scope.purchase = data;
			$scope.purchaseId = $stateParams.index;

			//Find the purchase with id that we want to edit.
			for (var i = 0; i < $scope.purchase.length; i++) {
				if ($scope.purchaseId == $scope.purchase[i].id) {
					$scope.editPurchase = $scope.purchase[i];
				}
			}

			$scope.editPurchases = function() {
				$scope.editPurchase.put().then(function() {
					$state.go('Purchases', {}, {reload: true});	
				});
			};
		});

		$scope.deletePurchase = function() {
				Restangular.one('purchase', $scope.purchaseId).remove().then(function() {
					$state.go('Purchases', {}, {reload: true});
				});
			};
	};

	app.controller("editController", editController);
})();