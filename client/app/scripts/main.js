(function() {
    var app = angular.module('app', ['ui.router', 'restangular', 'ui.bootstrap']),
        dayCtrl = require('./controllers/dayCtrl.js'),
        purchasesCtrl = require('./controllers/purshasesCtrl.js');
        editCtrl = require('./controllers/editCtrl.js');
        addCtrl = require('./controllers/addCtrl.js');

    var a = 1;    

    app.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9001');

        $stateProvider
            .state('Purchases', {
                url: "/{day}",
                templateUrl: "views/table.html",
                controller: 'purchasesController'
            })
            .state('Purchases.add', {
                url: "/addPurchase",
                onEnter: function ($modal, $state) {
                    $modal.open({
                        templateUrl: "views/addPurchase.html",
                        controller: 'addController',
                        size: 'lg'
                    }).result.finally(function() {
                        $state.go('Purchases');
                    });                    
                }
            })
            .state('Purchases.edit', {
                url: "/editPurchase/{index}",
                onEnter: function($modal, $state) {
                    $modal.open({
                        templateUrl: "views/editPurchase.html",
                        controller:  'editController',
                        size: 'lg'
                    }).result.finally(function() {
                        $state.go('Purchases');
                    });
                }
            });
    });
}());