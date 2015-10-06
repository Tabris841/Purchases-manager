(function(){
	var app = angular.module('app');

	var addController = function($scope, $state, Restangular, $stateParams) {
		$scope.daysName = $stateParams.day;
		
		$scope.savePurchase = function() {
				$scope.newPurchase.day = $scope.daysName;
				Restangular.all('purchase').post($scope.newPurchase).then(function() {
					$state.go('Purchases', {}, {reload: true});		
				});				
			};
	};

	app.controller("addController", addController);
})();