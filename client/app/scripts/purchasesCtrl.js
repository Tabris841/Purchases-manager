(function () {
    var purchasesApp = angular.module("purchasesApp", ['ui.router', 'restangular']);

    var purchasesCtrl = function($scope, Restangular) {
        Restangular.all('data/days.json').getList().then(function(data) {
            $scope.days = data;

        });
    };

    purchasesApp.controller("purchasesCtrl", purchasesCtrl);
})();
