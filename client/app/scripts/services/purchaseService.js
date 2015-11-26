(function() {
	var app = angular.module('app');

	var purchasesService = function($state, Restangular) {

		var getPurchases = function() {
			return Restangular.all('purchase').getList().then(function(response) {
				return response;
			});
		};

		var addPurchase = function(data) {
			Restangular.all('purchase').post(data).then(function() {
					$state.go('Purchases', {}, {reload: true});		
				});	
		};

		var editPurchase = function(data) {
			data.put().then(function() {
					$state.go('Purchases', {}, {reload: true});	
				});
		};

		var deletePurchase = function(index) {
			Restangular.one('purchase', index).remove().then(function() {
				$state.go($state.current, {}, {reload: true});
			});
		};

		return {
			getPurchases: getPurchases,
			addPurchase: addPurchase,
			editPurchase: editPurchase,
			deletePurchase: deletePurchase
		};
	};

	app.factory("purchasesService", purchasesService);
})();