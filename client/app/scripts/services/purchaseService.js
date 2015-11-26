(function() {
	var app = angular.module('app');

	var purchasesService = function($state, Restangular) {

		var getPurchases = function() {
			return Restangular.all('purchase').getList();
		};

		var addPurchase = function(data) {
			return Restangular.all('purchase').post(data);
		};

		var editPurchase = function(data) {
			return data.put();
		};

		var deletePurchase = function(index) {
			return Restangular.one('purchase', index).remove();
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