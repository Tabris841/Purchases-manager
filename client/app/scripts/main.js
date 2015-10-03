(function() {
    var app = angular.module('app', ['ui.router', 'restangular']),
        dayCtrl = require('./controllers/dayCtrl.js'),
        purchasesCtrl = require('./controllers/purshasesCtrl.js');

    app.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9001');

        $urlRouterProvider.otherwise("/Monday");

        $stateProvider
            .state('purchases', {
                url: "/{day}",
                templateUrl: "views/table.html",
                controller: 'purchasesController'
            });
    });

    app.factory('FirstRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:9001');
        });
    });
}());