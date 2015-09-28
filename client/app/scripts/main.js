(function () {
    var purchasesApp = angular.module('purchasesApp', ['ui.router', 'restangular']);
    //var tableController = require('./tableController.js');
    //var purchasesCtrl = require('./purchasesCtrl.js');
    //var services = require('./services.js');
    //purchasesApp.config(function (RestangularProvider) {
    //    RestangularProvider.setBaseUrl('data');
    //});


    purchasesApp.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('data');

        $urlRouterProvider.otherwise("/monday");

        $stateProvider
            .state('monday', {
                url: "/monday",
                templateUrl: "table.html",
                resolve: {
                    title: function () {
                        return {value: 'simple!'}
                    }
                }
            })
            .state('tuesday', {
                url: "/tuesday",
                templateUrl: "table.html"
            })
            .state('wednesday', {
                url: "/wednesday",
                templateUrl: "table.html"
            })
            .state('thursday', {
                url: "/thursday",
                templateUrl: "table.html"
            })
            .state('friday', {
                url: "/friday",
                templateUrl: "table.html"
            })
            .state('saturday', {
                url: "/saturday",
                templateUrl: "table.html"
            })
            .state('sunday', {
                url: "/sunday",
                templateUrl: "table.html"
            })

    });

    purchasesApp.controller('purchasesCtrl', function ($scope, Restangular) {
        Restangular.all('days.json').getList().then(function (data) {
            $scope.days = data;
        });
    });
}());