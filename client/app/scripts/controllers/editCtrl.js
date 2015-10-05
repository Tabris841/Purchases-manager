(function() {
	var app = angular.module('app');

	var editController = function($scope, $state, Restangular, $stateParams) {
		Restangular.all('purchase').getList().then(function(data) {
			$scope.purchase = data;
			console.log($scope.purchase);
			$scope.editPurchase = $scope.purchase[$stateParams];
			console.log($scope.editPurchase);
		});
	};

	app.controller("editController", editController);
})();