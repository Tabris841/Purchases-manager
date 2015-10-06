(function() {
	var app = angular.module('app');

	var purchasesController = function($scope, $state, Restangular, $stateParams) {
		Restangular.all('purchase').getList().then(function(data) {
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
				$scope.purchaseId = index;
				//Find the purchase with the id that we want to delete.
				for (var i = 0; i < $scope.purchase.length; i++) {
					if ($scope.purchaseId == $scope.purchase[i].id) {
						$scope.purchaseToDelete = $scope.purchase[i].id;
					}
				}
				Restangular.one('purchase', $scope.purchaseToDelete).remove().then(function() {
					$state.go($state.current, {}, {reload: true});
				});
			};			
		});
	};

	app.controller("purchasesController", purchasesController);
})();