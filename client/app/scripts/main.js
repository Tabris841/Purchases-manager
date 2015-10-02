(function() {
    var purchasesApp = angular.module('purchasesApp', ['ui.router', 'restangular']);
    //var tableController = require('./tableController.js');
    //var purchasesCtrl = require('./purchasesCtrl.js');
    //var services = require('./services.js');
    //purchasesApp.config(function (RestangularProvider) {
    //    RestangularProvider.setBaseUrl('data');
    //});
    // var mondayCtrl = require('./controllers/mondayCtrl.js');


    purchasesApp.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9001');
        RestangularProvider.setRestangularFields({
            id: "_id"
        });

        $urlRouterProvider.otherwise("/Monday");

        $stateProvider
            .state('Monday', {
                url: "/Monday",
                templateUrl: "views/table.html",
                controller: function($scope, $state, $window, Restangular, $location) {
                    Restangular.all('purchase').getList().then(function(data) {
                        $scope.purchase = data;
                        $scope.purchases = [];
                        $scope.newPurchases = {};
                        Restangular.one('days');
                        var path = $location.url();
                        path = path.substr(1);
                        
                        for (var i = 0; i < $scope.week.length; i++) {
                            if (path == $scope.week[i]) {
                                $scope.daysId = $scope.days[i].id;
                                for (var x = 0; x < $scope.purchase.length; x++) {
                                    if ($scope.daysId == $scope.purchase[x].days_id) {
                                        $scope.purchases.push($scope.purchase[x]);                                      
                                    }
                                }
                            }
                        }
                        $scope.savePurchase = function() {
                            $scope.days[0].purchases.push($scope.newPurchases);
                            Restangular.copy($scope.days[0]).save();
                            $window.location.reload();
                        };
                        $scope.deletePurchase = function() {
                            $scope.days[0].purchases.splice(($scope.id), 1);
                            Restangular.copy($scope.days[0]).remove();
                        };
                    });
                }
            })
            .state('Tuesday', {
                url: "/Tuesday",
                templateUrl: "views/table.html",
                controller: function($scope, Restangular) {
                    Restangular.all('days').getList().then(function(data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[1].purchases;
                    });
                }
            })
            .state('Wednesday', {
                url: "/Wednesday",
                templateUrl: "table.html",
                controller: function($scope, Restangular) {
                    Restangular.all('days').getList().then(function(data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[2].purchases;
                    });
                }
            })
            .state('Thursday', {
                url: "/Thursday",
                templateUrl: "table.html",
                controller: function($scope, Restangular) {
                    Restangular.all('days').getList().then(function(data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[3].purchases;
                    });
                }
            })
            .state('Friday', {
                url: "/Friday",
                templateUrl: "table.html",
                controller: function($scope, Restangular) {
                    Restangular.all('days').getList().then(function(data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[4].purchases;
                    });
                }
            })
            .state('Saturday', {
                url: "/Saturday",
                templateUrl: "table.html",
                controller: function($scope, Restangular) {
                    Restangular.all('days').getList().then(function(data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[5].purchases;
                    });
                }
            })
            .state('Sunday', {
                url: "/Sunday",
                templateUrl: "table.html",
                controller: function($scope, Restangular) {
                    Restangular.all('days').getList().then(function(data) {
                        $scope.days = data;
                        $scope.purchases = $scope.days[6].purchases;
                    });
                }
            });

    });


    purchasesApp.controller('purchasesCtrl', function($scope, Restangular) {
        Restangular.all('data').getList().then(function(data) {
            $scope.days = data;
            $scope.week = [];

            for (var i = 0; i < $scope.days.length; i++) {
                $scope.week.push($scope.days[i].day);
            }
        });
    });

    purchasesApp.factory('FirstRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:9001');
        });
    });

    // purchasesApp.factory('Purchase', [Restangular, function(Restangular){
    //     return {
    //         days : Restangular.all().getList()
    //     };
    // }]);

}());