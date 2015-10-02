(function () {
    var purchasesApp = angular.module('purchasesApp', ['ui.router', 'restangular']);
    //var tableController = require('./tableController.js');
    //var purchasesCtrl = require('./purchasesCtrl.js');
    //var services = require('./services.js');
    //purchasesApp.config(function (RestangularProvider) {
    //    RestangularProvider.setBaseUrl('data');
    //});
    // var mondayCtrl = require('./controllers/mondayCtrl.js');


    purchasesApp.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9001');
        RestangularProvider.setRestangularFields({
            id: "_id"
        });

        $urlRouterProvider.otherwise("/monday");

        


        $stateProvider
            .state('Monday', {
                url: "/Monday",
                templateUrl: "views/table.html",
                controller: function ($scope, $state, $window, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[0].purchases;
                        $scope.id = $scope.days[0]._id;
                        console.log($scope.id);
                        console.log($scope.purchases);
                        $scope.newPurchases = {};
                        Restangular.one('days');
                        $scope.savePurchase = function () {
                            $scope.days[0].purchases.push($scope.newPurchases);
                            Restangular.copy($scope.days[0]).save();
                            $window.location.reload();
                        };
                        $scope.deletePurchase = function () {
                            $scope.days[0].purchases.splice(($scope.id), 1);
                            console.log($scope.days[0].purchases);
                            Restangular.copy($scope.days[0]).remove();
                        };
                    });
                }
            })
            .state('Tuesday', {
                url: "/Tuesday",
                templateUrl: "views/table.html",
                controller: function ($scope, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[1].purchases;
                    });
                }
            })
            .state('Wednesday', {
                url: "/Wednesday",
                templateUrl: "table.html",
                controller: function ($scope, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[2].purchases;
                    });
                }
            })
            .state('Thursday', {
                url: "/Thursday",
                templateUrl: "table.html",
                controller: function ($scope, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[3].purchases;
                    });
                }
            })
            .state('Friday', {
                url: "/Friday",
                templateUrl: "table.html",
                controller: function ($scope, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[4].purchases;
                    });
                }
            })
            .state('Saturday', {
                url: "/Saturday",
                templateUrl: "table.html",
                controller: function ($scope, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[5].purchases;
                    });
                }
            })
            .state('Sunday', {
                url: "/Sunday",
                templateUrl: "table.html",
                controller: function ($scope, Restangular) {
                    Restangular.all('days').getList().then(function (data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[6].purchases;
                    });
                }
            });

    });


    purchasesApp.controller('purchasesCtrl', function ($scope, Restangular) {
        Restangular.all('days').getList().then(function (data) {
            $scope.days = data;
        });
    });

    // purchasesApp.factory('Purchase', [Restangular, function(Restangular){
    //     return {
    //         days : Restangular.all().getList()
    //     };
    // }]);

}());