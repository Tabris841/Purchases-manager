(function() {
    var app = angular.module('app', ['ui.router', 'restangular']),
        dayCtrl = require('./controllers/dayCtrl.js'),
        purchasesCtrl = require('./controllers/purshasesCtrl.js');

    app.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9001');

        $urlRouterProvider.otherwise("/Monday");

        $stateProvider
            .state('Purchases', {
                url: "/{day}",
                templateUrl: "views/table.html",
                controller: 'purchasesController'
            });
    });
}());