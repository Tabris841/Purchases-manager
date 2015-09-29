(function () {
    var purchasesApp = angular.module("purchasesApp", ['restangular']);

    var mondayCtrl = function($scope, Restangular) {
        Restangular.all('data/days.json').getList().then(function(data) {
            $scope.days = data;
            $scope.purchases = $scope.days[0].purchases; 	
        });
    };

    purchasesApp.controller("mondayCtrl", mondayCtrl);
})();